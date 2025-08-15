import express from "express";
import { body } from "express-validator";

import { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz } from "../controllers/quiz";
import { isAuthenticated } from "../middlewares/isAuth";

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
        })
], createQuiz);

// get quiz
router.get('/:quizId', isAuthenticated, getQuiz);

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
        })
], updateQuiz);

// delete quiz
router.delete('/:quizId', isAuthenticated, deleteQuiz);

// publish quiz
router.patch('/publish', isAuthenticated, publishQuiz);



export default router;