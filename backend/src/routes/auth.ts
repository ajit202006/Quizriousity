import express from "express";
import { registerUser, loginUser, isUserExist } from "../controllers/auth";
import { body } from "express-validator";

// routing /user queries
const router = express.Router();


// POST request for /auth
router.post("/", [
    body("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage("Please enter a valid name with at least 3 characters"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email should contain an '@' symbol and a valid domain name")
        .normalizeEmail()
        .custom((emailID:String) => {
            return isUserExist(emailID)
                .then((status) => {
                    if (status) {
                        return Promise.reject("User already exist");
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                })
        })
        ,
    body("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Enter at least 8 characters in password"),
    body("confirm_password")
    .trim()
    .custom((value,{req})=>{
        if (value!=req.body.password){
            return Promise.reject("confirm_password should be same as password");
        }
        return true;
    })
], registerUser);

// POST request for /auth/login
router.post("/login",[body("email").isEmail().normalizeEmail()], loginUser);

export default router;