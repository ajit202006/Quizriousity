import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        questions_list: [
            {
                question_number:{
                    type:Number,
                    required:true
                },
                question: String,
                options: {
                }
            }
        ],
        answers: {},
        created_by:{
            type:mongoose.Types.ObjectId,
            required:true
        },
        is_published:{
            type:Boolean,
            default:false
        },
        passing_percentage:{
            type:Number,
            default:25,
            required:true
        }
    },
    { timestamps: true }
)

const Quiz = mongoose.model("Quiz", quizSchema);

// exporting schema
export default Quiz;    