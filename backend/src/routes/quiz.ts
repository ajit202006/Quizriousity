import express from "express";
import { body } from "express-validator";
import { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz } from "../controllers/quiz";
import { isAuthenticated } from "../middlewares/isAuth";
import { getReviews, addReview, deleteReview } from "../controllers/review";

const router = express.Router();

// Create quiz
router.post('/', isAuthenticated, [
    body("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
        .withMessage("Name should contain more than 3 characters."),
    body("questions_list")
        .custom((questions_list) => {
            if (!questions_list.length) {
                return Promise.reject("Questions list is empty.");
            }
            return true;
        }),

    body("answers")
        .custom((value, { req }) => {
            if (Object.keys(value).length !== req.body.questions_list.length) {
                return Promise.reject("'Answers' does not match 'Questions List'")
            }
            return true;
        }),
    body("passing_percentage")
    .custom((value)=>{
        if (value===undefined){
            return true;
        }else if (typeof value==='string' || value>50 || value<0){
            return Promise.reject("Passing percentage should be in range 0 to 50")
        }
        return true;
    })
], createQuiz);

// get quiz
router.get('/{:quizId}', isAuthenticated, getQuiz);

//update quiz
router.put('/', isAuthenticated, [
    body("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
        .withMessage("Name should contain more than 3 characters."),
    body("questions_list")
        .custom((questions_list) => {
            if (!questions_list.length) {
                return Promise.reject("Questions list is empty.");
            }
            return true;
        }),

    body("answers")
        .custom((value, { req }) => {
            if (Object.keys(value).length !== req.body.questions_list.length) {
                return Promise.reject("'Answers' does not match 'Questions List'")
            }
            return true;
        }),
    body("passing_percentage")
    .custom((value)=>{
        if (value===undefined){
            return true;
        }else if (typeof value==='string' || value>50 || value<0){
            return Promise.reject("Passing percentage should be in range 0 to 50")
        }
        return true;
    })
], updateQuiz);

// delete quiz
router.delete('/:quizId', isAuthenticated, deleteQuiz);

// publish quiz
router.patch('/publish', isAuthenticated, publishQuiz);

// Quiz review routes

//get reviews quiz/:quizId/reviews
router.get('/:quizId/reviews', isAuthenticated, getReviews);

//add review
router.post('/:quizId/reviews', isAuthenticated, [
    body("rating")
        .notEmpty()
        .isNumeric()
        .withMessage("Rating should be a number")
        .custom((rating) => {
            if (rating > 5 || rating < 0) {
                return Promise.reject("Invalid rating enter a value in range 0 to 5");
            } else {
                return true;
            }
        })
], addReview);

//delete review
router.delete('/:quizId/reviews', isAuthenticated, deleteReview);

export default router;