import express from "express";
import { body } from "express-validator";
import { getUser, updateUser, updatePassword, getUserDashboard, searchUser, getUserQuizzes ,getUnpublishedQuizzes} from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuth";

// routing /user queries
const router = express.Router();

// GET request 
router.get("/", isAuthenticated, getUser);

//PUT /user
router.put("/", isAuthenticated, updateUser);

//PUT /user/update_password
router.put("/update_password", isAuthenticated, [
    body("current_password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Enter at least 8 characters in password"),
    body("new_password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Enter at least 8 characters in password")
        .custom((value, { req }) => {
            if (value == req.body.current_password) {
                return Promise.reject("new_password cannot be same as current_password");
            }
            return true;
        }),
    body("confirm_password")
        .trim()
        .custom((value, { req }) => {
            if (value != req.body.new_password) {
                return Promise.reject("confirm_password should be same as new_password");
            }
            return true;
        })
], updatePassword)

// searching a user
router.post('/search', isAuthenticated, [
    body("userName")
        .trim()
        .notEmpty()
        .withMessage("Enter a name to search")
], searchUser);

// getting /user/dashboard
router.get("/:userId", isAuthenticated, getUserDashboard);

// get /user/:userId/quizzes
router.get("/:userId/quizzes", isAuthenticated, getUserQuizzes);

// get unpublished quizzes only for the current user;
router.get("/:userId/quizzes/unpublished",isAuthenticated,getUnpublishedQuizzes);

export default router;