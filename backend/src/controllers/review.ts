import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ReturnResponse } from "../util/interfaces";
import ProjectError from "../helper/ProjectError";
import Quiz from "../models/quiz";
import Review from "../models/review";
import Report from "../models/report";
import User from "../models/user";

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const reviews = await Review.find({ quizId });
        let resp: ReturnResponse;
        if (!reviews.length) {
            resp = { status: "error", message: "No reviews found", data: {} };
        } else {
            resp = { status: "success", message: "Reviews found", data: reviews };
        }
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp: ReturnResponse;
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            resp = { status: "error", message: "Validation failed!", data: validationError.array() };
            res.send(resp);
        }

        const userId = req.userId;
        const quizId = req.params.quizId;
        const rating = req.body.rating;
        const feedback = req.body.feedback || "";

        const quizAttempted = await Report.findOne({ quizId, userId });
        if (!quizAttempted) {
            const err = new ProjectError("Attempt the quiz to review.");
            err.statusCode = 401;
            throw err;
        }

        const user = await User.findById(userId, { name: 1 });
        if (!user) {
            const err = new ProjectError("User does not exist");
            err.statusCode = 402;
            throw err;
        }
        
        const quiz = await Quiz.findById(quizId, { created_by: 1 });
        if (!quiz) {
            const err = new ProjectError("Quiz not found");
            err.statusCode = 401;
            throw err;
        }
        if (quiz.created_by.toString() === userId) {
            const err = new ProjectError("You cannot review your own quiz");
            err.statusCode = 401;
            throw err;
        }
        let review;
        const reviewExist = await Review.find({ userId });
        if (reviewExist.length) {
            review = reviewExist[0];
            review.userName=user?.name;
            review.rating = rating;
            review.feedback = feedback;
        } else {
            review = new Review({ userId, quizId, userName: user?.name, rating, feedback });
        }
        const status = await review.save();
        if (!status) {
            resp = { status: "error", message: "Review not saved", data: {} };
        } else {
            resp = { status: "success", message: "Review saved", data: { reviewId: review._id } };
        }
        res.send(resp);
    } catch (error) {
        next(error)
    }
}

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const review = (await Review.find({ userId }))[0];

        if (!review) {
            const err = new ProjectError("Review not found");
            err.statusCode = 401;
            throw err;
        }

        if (review.userId.toString() !== userId) {
            const err = new ProjectError("Unauthorized access");
            err.statusCode = 401;
            throw err;
        }

        await Review.findByIdAndDelete(review._id);
        const resp: ReturnResponse = { status: "success", message: "Deleted your review", data: {} };
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

export { getReviews, addReview, deleteReview };