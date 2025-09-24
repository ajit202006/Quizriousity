import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import TokenContext from '../contexts/TokenContext';

const serverURL = 'http://localhost:3000';

const QuizView = () => {
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext);
    const params = useParams();
    const quizId = params.quizId;
    const userId = params.userId;
    const [userName, setUserName] = useState('');
    const [quiz, setQuiz] = useState({
        _id: '----',
        name: '----',
        questions_list: [
            {
                question_number: 1,
                question: '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
                options: {
                    1: '----------------------------------------------------------------------------------------------------------------------------------------------------------------------',
                    2: '---',
                    3: '---',
                    4: '---'
                }
            }
        ],
        created_by: '----',
        passing_percentage: 5,
    });

    useEffect(() => {
        fetch(serverURL + `/exam/${quizId}`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => setQuiz(result.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(serverURL + `/user/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => setUserName(result.data.user.name))
            .catch(err => console.log(err));
    }, []);

    const questionsList = quiz.questions_list.map((question) => {
        return (
            <li className='w-11/12 mb-10' id={'q' + question.question_number} key={'q' + question.question_number} >
                Q {question.question_number}.<span className='ml-2'>{question.question}</span>
                <div className='w-full flex flex-col *:my-1.5'>
                    <h1>Options :-</h1>
                    <ul className='w-11/12 self-center *:max-w-9/10'>
                        <li>A. {question.options[1]}</li>
                        <li>B. {question.options[2]}</li>
                        <li>C. {question.options[3]}</li>
                        <li>D. {question.options[4]}</li>
                    </ul>
                </div>
            </li>
        );
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='w-full h-full flex overflow-x-scroll [&::-webkit-scrollbar]:hidden snap-mandatory snap-x *:snap-center '>
                <section id='quiz-info' className='min-w-full h-full'>
                    <div className='h-1/3 flex flex-col relative items-center justify-center *:flex *:items-center *:justify-center'>
                        <h1 className='w-full h-3/10 text-3xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap overflow-x-auto overflow-y-none [&::-webkit-scrollbar]:hidden' title={quiz.name}>{quiz.name}</h1>
                        <p className='text-xl md:text-[20px] lg:text-2xl text-[#B9B9B9] font-semibold'>Created by :- <span className='max-w-xs hover:underline cursor-pointer mx-1 whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' onClick={() => navigate(`/users/${userId}`)}>{userName}</span></p>
                    </div>
                    <hr />
                    <div className='flex flex-col items-center justify-around min-h-6/12 max-h-full'>
                        <h1 className='text-4xl'>Details</h1>
                        <div className='w-95/100 lg:w-4/5 text-xl md:text-2xl grid gap-2 *:flex *:justify-between *:px-10 md:*:px-20 lg:*:px-40 *:relative'>
                            <hr />
                            <p>Questions<span>{quiz.questions_list.length}</span></p>
                            <hr />
                            <p>Passing Marks<span>{Math.ceil(quiz.passing_percentage / 100 * quiz.questions_list.length)}</span></p>
                            <hr />
                        </div>
                        <div className='flex gap-5  w-4/5 justify-between sm:justify-around'>
                            <a className='*:py-2' href='#quiz-view'><Button value='View Quiz' onClick={null} /></a>
                            <Button value='Quizzes' onClick={() => navigate(`/quizzes`)} />
                            <Button value='Reviews' onClick={() => navigate(`/users/${userId}/quiz/${quizId}/reviews/${quiz.name}`)} />
                        </div>
                    </div>
                </section>
                <section id='quiz-view' className='min-w-full max-h-max min-h-full font-semibold overflow-y-auto custom-scrollbar md:py-4 flex justify-center '>
                    <div className='w-full md:w-95/100 h-max min-h-95/100 flex flex-col items-center justify-between px-0 py-4 md:p-4 md:rounded-3xl bg-quiz-view-bg text-black'>
                        <h1 className='max-w-4/5 h-40 grid place-items-center text-4xl whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' >{quiz.name}</h1>
                        <ul className='w-4/5 text-xl py-5 flex flex-col items-center '>
                            {questionsList}
                        </ul>
                        <div className='w-4/5 flex font-normal justify-around text-white' >
                            <Button value='Start Exam' onClick={() => navigate(`/quiz/${quizId}/exam`)} />
                            <a href='#quiz-info'><Button value='Go to quiz' onClick={null} /></a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default QuizView;
