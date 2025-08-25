import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import User from "../models/user";
import ProjectError from "../helper/ProjectError";
import { ReturnResponse } from "../util/interfaces";
import Quiz from "../models/quiz";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const userId = req.userId;

        const user = await User.findById(userId, { name: 1, email: 1, createdQuizCount: 1, attemptedQuizCount: 1, passedCount: 1 });
        if (!user) {
            const err = new ProjectError("User not found");
            err.statusCode = 401;
            throw err;
        } else {
            resp = { status: "success", message: "User found", data: { user: user } };
            res.send(resp)
        }
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const userId = req.body._id;
        if (req.userId != req.body._id) {
            const err = new ProjectError("Unauthorized User");
            err.statusCode = 401;
            throw err;
        }
        const user = await User.findById(userId, { name: 1, email: 1, updatedAt: 1 });
        user ? user.name = req.body.name : undefined;
        await user?.save()
        if (!user) {
            const err = new ProjectError("No user found");
            err.statusCode = 401;
            throw err;
        } else {
            resp = { status: "success", message: "Updation done", data: { user } };
            res.send(resp)
        }
    } catch (error) {
        next(error);
    }
}


const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (userId !== req.body._id) {
            const err = new ProjectError("Unauthorized user");
            err.statusCode = 401;
            throw err;
        }
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            const err = new ProjectError("Validation failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const user = await User.findById(userId);
        if (!user) {
            const err = new ProjectError("User not found");
            err.statusCode = 401;
            throw err;
        }
        const password = req.body.current_password;
        const status = await bcrypt.compare(password, user.password);
        if (!status) {
            const err = new ProjectError("Current password is incorrect.");
            err.statusCode = 401;
            throw err;
        }
        user.password = await bcrypt.hash(req.body.new_password, 12);
        await user.save();
        const resp: ReturnResponse = { status: "success", message: "Password updated", data: {} }
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

const getUserDashboard = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId, { name: 1, createdQuizCount: 1, attemptedQuizCount: 1, passedCount: 1 });
        if (!user) {
            const err = new ProjectError("User not found");
            err.statusCode = 401;
            throw err;
        }
        resp = { status: "success", message: "User found", data: { user } };
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

const searchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            const err = new ProjectError("Validation failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const userName = req.body.userName;
        const regex = new RegExp(`^${userName}`, "i");
        const users = await User.find({ name: { $regex: regex },_id:{$not:{$eq:req.userId}} }, { name: 1 });
        let resp: ReturnResponse;
        if (!users.length) {
            resp = { status: "error", message: "No user exist with given name", data: [] };
        } else {
            resp = { status: "success", message: "Users List", data: users };
        }
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

const getUserQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const userExists = await User.findById(userId, { name: 1 })
        if (!userExists) {
            const err = new ProjectError("User not found");
            err.statusCode = 401;
            throw err;
        }
        const quizzes = await Quiz.find({ created_by: userId, is_published: true }, { name: 1, questions_list: 1, passing_percentage: 1 });
        const resp: ReturnResponse = { status: "success", message: "Quizzes found", data: quizzes };
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

const getUnpublishedQuizzes = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const userId = req.params.userId;
        if (req.userId !== userId){
            const err = new ProjectError("Unauthorized user");
            err.statusCode = 401;
            throw err;
        }
        const quizzes = await Quiz.find({ created_by: userId, is_published: false });
        const resp: ReturnResponse = { status: "success", message: "Quizzes found", data: quizzes };
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
    
}
export { getUser, updateUser, updatePassword, getUserDashboard, searchUser, getUserQuizzes,getUnpublishedQuizzes };