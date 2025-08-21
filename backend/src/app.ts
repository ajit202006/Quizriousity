import express,{Request,Response,NextFunction} from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import quizRouter from "./routes/quiz";
import examRouter from "./routes/exam";
import reportRouter from "./routes/report";

import ProjectError from "./helper/ProjectError";
import { ReturnResponse } from "./util/interfaces";

const app = express();
const connectionString = process.env.CONNECTION_STRING || "" ;
const clientURL = "http://localhost:5173"

declare global{
    namespace Express{
        interface Request{
            userId:String
        }
    }
}

app.use(express.json());
app.use(cors<Request>({origin:[clientURL]}))
app.get("/", (req, res) => {
    res.send("Server is working");
})

// redirecting /user request to userRouter
app.use("/user", userRouter);

// redirecting /auth request to userRouter
app.use("/auth", authRouter);

// redirecting /quiz request to quizRouter
app.use("/quiz",quizRouter);

// redirecting /exam request to examRouter
app.use("/exam",examRouter);

// redirecting /report request to reportRouter
app.use("/report",reportRouter);

app.use((err:ProjectError,req:Request,res:Response,next:NextFunction)=>{
    let resp:ReturnResponse;
    let message:String;
    let statusCode:number;
    if (!!err.statusCode && err.statusCode<500){
        message= err.message;
        statusCode= err.statusCode;
    }else{
        message= "Something went wrong";
        statusCode=500;
    }
    resp = {status:"error",message,data:{}};
    if (!!err.data){
        resp.data= err.data;
    }
    console.log(err.statusCode,err.message);
    res.status(statusCode).send(resp);
})

//Connecting to database 
mongoose.connect(connectionString)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server Connected");

        })
    })
    .catch(err => console.log(err));
