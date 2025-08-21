import { useContext, useEffect, useState } from "react";
import TokenContext from "../contexts/TokenContext";
import ListWrapper from "./ListWrapper";

interface QuizInterface {
    _id:string,
    name: string,
    questions_list: [
        {
            question_number: number,
            question: string,
            options: {}
        }
    ],
    answers: {},
    created_by: string,
    is_published: Boolean,
    passing_percentage: number,
}

const serverURL = "http://localhost:3000";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    useEffect(() => {
        fetch(serverURL+'/quiz', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+token
            }
        })
            .then(response => response.json())
            .then(result => {
                setQuizzes(result.data.quizzes)
            })
            .catch(err => {
                err.message === "Failed to fetch" && alert("Server not working can't fetch quizzes.")
            })
    }, []);

    const quizList = quizzes.map((quiz:QuizInterface) => {
        return (
            <li id={quiz._id}>
                {quiz.name}
            </li>
        );
    });

    return (
        <ListWrapper>
            {quizList.length ? quizList : "There are no quizzes"}
        </ListWrapper>
    );
}

export default QuizList;