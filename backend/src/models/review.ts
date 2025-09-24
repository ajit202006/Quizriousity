import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            required: true
        },
        quizId:{
            type:mongoose.Types.ObjectId,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
            min:0,
            max:5
        },
        feedback:{
            type:String,
            default:""
        },
    },
    {timestamps:true}
);

const Review = mongoose.model("Review",reviewSchema);

export default Review;