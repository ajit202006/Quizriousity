import { NextFunction, Request, Response } from "express";
import ProjectError from "../helper/ProjectError";
import Quiz from "../models/quiz";
import Report from "../models/report";
import { ReturnResponse } from "../util/interfaces";
import User from "../models/user";

const startExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId, { name: 1, questions_list: 1, is_published: 1, passing_percentage: 1});
        if (!quiz) {
            const err = new ProjectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }
        if (!quiz.is_published) {
            const err = new ProjectError("Quiz not published");
            err.statusCode = 405;
            throw err;
        }
        const resp: ReturnResponse = { status: "success", message: "Quiz", data: quiz };
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

const submitExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attempted_questions = req.body.attempted_questions;
        const quizId = req.body.quizId;

        const quiz = await Quiz.findById(quizId, { name: 1, answers: 1, created_by: 1, passing_percentage: 1 });
        const answers = quiz?.answers;
        const passingPercentage = quiz?.passing_percentage || 25;
        const userId = req.userId;
        const allQuestions = Object.keys(answers);
        const total = allQuestions.length;

        if (userId === quiz?.created_by.toString()) {
            const err = new ProjectError("You cannot submit your own quiz.");
            err.statusCode = 405;
            throw err;
        }
        let score = 0;
        for (let i = 0; i < total; i++) {
            let question_number = allQuestions[i]
            if (!!attempted_questions[question_number] && answers[question_number] == attempted_questions[question_number]) {
                score++;
            }
        }

        const percentage = (score / total) * 100;
        let result = "";
        if (percentage >= passingPercentage) {
            result = "Pass";
        } else {
            result = "Fail";
        }

        const report = new Report({ userId, quizId, quizName: quiz?.name, score, total, percentage, result });
        const data = await report.save();
        const user = await User.findById(userId, { attemptedQuizCount: 1, passedCount: 1 });
        if (user) {
            user.attemptedQuizCount += 1;
            if (result === "Pass") {
                user.passedCount += 1;
            }
            await user.save();
        }
        const resp: ReturnResponse = { status: "success", message: "Quiz submitted", data: { total, score, percentage, result, reportId: data._id } }
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

export { startExam, submitExam };