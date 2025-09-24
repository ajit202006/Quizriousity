import express from "express";
import { getReport } from "../controllers/report";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

router.get("{/:reportId}",isAuthenticated,getReport);

export default router;