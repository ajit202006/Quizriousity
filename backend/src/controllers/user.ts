import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import User from "../models/user";
import ProjectError from "../helper/ProjectError";
import { ReturnResponse } from "../util/interfaces";
import { validationResult } from "express-validator";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const userId = req.params.userId;
        if (req.userId != req.params.userId) {
            const err = new ProjectError("Unauthorized User");
            err.statusCode = 401;
            throw err;
        }

        const user = await User.findById(userId, { name: 1, email: 1, _id: 0 });
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
            resp = { status: "success", message: "Registration done", data: { user } };
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
        if (!validationError.isEmpty()){
            const err = new ProjectError("Validation failed!");
            err.statusCode= 422;
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

export { getUser, updateUser, updatePassword };