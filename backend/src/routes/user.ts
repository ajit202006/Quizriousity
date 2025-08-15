import express from "express";
import { body } from "express-validator";
import { getUser, updateUser, updatePassword } from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuth";

// routing /user queries
const router = express.Router();

// GET request 
router.get("/:userId", isAuthenticated, getUser);

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


export default router;