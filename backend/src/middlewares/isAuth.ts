import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import ProjectError from "../helper/ProjectError";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const err = new ProjectError("Not authenticated");
            err.statusCode = 401;
            throw err;
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = <any>jwt.verify(token, "mykey");
            if (!decodedToken) {
                const err = new ProjectError("Not authenticated");
                err.statusCode = 401;
                throw err;
            }
            req.userId = decodedToken.userId;
        } catch (error) {
            console.log(error);
        }
        next();
    } catch (error) {
        next(error);
    }

}

export { isAuthenticated };
