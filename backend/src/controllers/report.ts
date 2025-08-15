import { NextFunction, Request, Response } from "express";
import Report from "../models/report";
import ProjectError from "../helper/ProjectError";
import { ReturnResponse } from "../util/interfaces";

const getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let report;
        if (!!req.params.reportId) {
            const reportId = req.params.reportId;
            report = await Report.findById(reportId);
            if (!report) {
                const err = new ProjectError("Report not found");
                err.statusCode = 404;
                throw err;
            }
            if (report.userId.toString() !== req.userId) {
                const err = new ProjectError("Unauthorized user");
                err.statusCode = 405;
                throw err;
            }
        } else {
            report = await Report.find({ userId: req.userId });
            if (!report) {
                const err = new ProjectError("Report not found");
                err.statusCode = 404;
                throw err;
            }
        }
        const resp: ReturnResponse= { status: "success", message: "Report ", data: report };
        res.send(resp);
    } catch (error) {
        next(error);
    }
}

export { getReport };