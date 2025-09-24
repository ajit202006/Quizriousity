import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user";
import ProjectError from "../helper/ProjectError";
import { ReturnResponse } from "../util/interfaces";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            const err = new ProjectError("Validation Failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = await bcrypt.hash(req.body.password, 12);

        const user = new User({ name, email, password });
        const result = await user.save();
        if (!result) {
            resp = { status: "error", message: "No result found", data: {} };
            res.send(resp);
        } else {
            resp = { status: "success", message: "Registration done", data: { userId: result._id } };
            res.send(resp)
        }
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let resp: ReturnResponse;
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (user) {
            const status = await bcrypt.compare(password, user.password);
            if (!status) {
                const err = new ProjectError("Credentials mismatch");
                err.statusCode = 401;
                throw err;
            } else {
                const token = jwt.sign({ userId: user._id }, "mykey", { expiresIn: "6h" });
                resp = { status: "success", message: "Logged in", data: { token } };
                res.status(200).send(resp);
            }
        } else {
            const err = new ProjectError("User Not Found");
            err.statusCode = 401;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

const isUserExist = async (email: String) => {
    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }
    return true;
}

export { registerUser, loginUser, isUserExist };
