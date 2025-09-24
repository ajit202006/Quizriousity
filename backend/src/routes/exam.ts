import express from "express";

import { submitExam,startExam } from "../controllers/exam";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

// Get quiz
router.get("/:quizId",isAuthenticated,startExam);

//Post quiz
router.post("/",isAuthenticated,submitExam);

export default router;