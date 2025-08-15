import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Quiz from "../models/quiz";
import ProjectError from "../helper/ProjectError";
import { ReturnResponse } from "../util/interfaces";

const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            const err = new ProjectError("Validation failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }

        const created_by = req.userId;
        const name = req.body.name;
        const questions_list = req.body.questions_list;
        const answers = req.body.answers

        const quiz = new Quiz({ name, questions_list, answers, created_by });
        const result = await quiz.save();
        const resp: ReturnResponse = { status: "success", message: "Quiz created successfully", data: { quizId: result._id } };
        res.status(201).send(resp);
    } catch (error) {
        next(error);
    }
}

const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId, { name: 1, questions_list: 1, answers: 1, created_by: 1 });
        if (!quiz) {
            const err = new ProjectError("Quiz Not Found");
            err.statusCode = 404;
            throw err;
        }
        if (quiz.created_by.toString() !== req.userId) {
            const err = new ProjectError("Unauthorized user");
            err.statusCode = 403;
            throw err;
        }
        const resp: ReturnResponse = { status: "success", message: "Quiz", data: { quiz } };
        res.status(200).send(resp);
    } catch (error) {
        next(error)
    }
}

const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            const err = new ProjectError("Validation failed!");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const quizId = req.body._id;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            const err = new ProjectError("Quiz Not Found");
            err.statusCode = 404;
            throw err;
        }
        if (quiz.created_by.toString() !== req.userId) {
            const err = new ProjectError("Unauthorized user");
            err.statusCode = 403;
            throw err;
        }
        if (quiz.is_published) {
            const err = new ProjectError("Cannot update. Quiz already published.");
            err.statusCode = 405;
            throw err;
        }
        quiz.name = req.body.name;
        quiz.questions_list = req.body.questions_list;
        quiz.answers = req.body.answers;
        await quiz.save();
        const resp: ReturnResponse = { status: "success", message: "Updated successfully", data: {} };
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            const err = new ProjectError("Quiz Not Found");
            err.statusCode = 404;
            throw err;
        }
        if (quiz?.created_by.toString() !== req.userId) {
            const err = new ProjectError("Unauthorized user");
            err.statusCode = 403;
            throw err;
        }
        if (quiz.is_published) {
            const err = new ProjectError("Cannot Delete. Quiz already published.");
            err.statusCode = 405;
            throw err;
        }
        await Quiz.deleteOne({ _id: quizId });
        const resp: ReturnResponse = { status: "success", message: "Quiz Deleted", data: {} };
        res.send(resp);
    } catch (error) {
        next(error);
    }
    res.send(req.params.quizId);
}

const publishQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            const err = new ProjectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }
        quiz.is_published = true;
        quiz.save();
        const resp: ReturnResponse = { status: "success", message: "Published", data: {} };
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

export { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };