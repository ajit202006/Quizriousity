import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import TokenContext from '../contexts/TokenContext';

const serverURL = 'http://localhost:3000';

const StartExam = () => {
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext);
    const quizId = useParams().quizId;
    const [answers, setAnswers] = useState<any>({});
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
    });

    useEffect(() => {
        fetch(serverURL + `/exam/${quizId}`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => {
                setQuiz(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    const addAnswer = (qNum: number, answer: number | undefined) => {
        const newAnswers = { ...answers };
        newAnswers[qNum] = answer;
        console.log(newAnswers);
        setAnswers(newAnswers);
    }

    const submitExam = async () => {
        const response = await fetch(serverURL + '/exam', {
            method: 'POST',
            body: JSON.stringify({ quizId, attempted_questions: answers }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenContext.token
            }
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert('Quiz submitted');
            navigate('/reports');
        } else {
            alert(result.message);
        }
    }

    const questionsList = quiz.questions_list.map((question) => {
        const qNum = question.question_number;
        return (
            <li className='w-11/12 mb-10' id={'q' + qNum} key={'q' + qNum} >
                Q {qNum}.<span className='ml-2'>{question.question}</span>
                <div className='w-full flex flex-col *:my-1.5'>
                    <h1>Options :-</h1>
                    <form className='w-11/12 flex flex-col self-center gap-2 md:*:max-w-9/10 *:flex *:items-center *:justify-between [&_span]:max-w-4/5 *:wrap-break-word [&_input]:custom-radio-button'>
                        <label htmlFor={qNum + '_1'}>
                            <span>A. {question.options[1]}</span>
                            <input className='custom-radio-button' id={qNum + '1'} type='radio' name={'q' + qNum} onClick={() => { addAnswer(qNum, 1) }} />
                        </label>
                        <label htmlFor={qNum + '_2'}>
                            <span>B. {question.options[2]} </span>
                            <input className='custom-radio-button' id={qNum + '2'} type='radio' name={'q' + qNum} onClick={() => { addAnswer(qNum, 2) }} />
                        </label>
                        <label htmlFor={qNum + '_3'}>
                            <span>C. {question.options[3]} </span>
                            <input className='custom-radio-button' id={qNum + '3'} type='radio' name={'q' + qNum} onClick={() => { addAnswer(qNum, 3) }} />
                        </label>
                        <label htmlFor={qNum + '_4'}>
                            <span>D. {question.options[4]}</span>
                            <input className='custom-radio-button' id={qNum + '4'} type='radio' name={'q' + qNum} onClick={() => { addAnswer(qNum, 4) }} />
                        </label>
                        <input className='self-start bg-button text-white px-1 rounded-md' type='reset' value='Clear selection'
                            onClick={() => { addAnswer(qNum, undefined) }} />
                    </form>
                </div>
            </li>
        );
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='w-full h-full flex overflow-x-scroll [&::-webkit-scrollbar]:hidden snap-mandatory snap-x *:snap-center '>
                <section className='min-w-full max-h-max min-h-full md:font-semibold overflow-y-auto custom-scrollbar md:py-4 flex justify-center '>
                    <div className='w-full min-h-full md:w-95/100 h-max md:min-h-95/100 flex flex-col items-center justify-between pb-4 md:p-4 md:rounded-3xl bg-quiz-view-bg text-black'>
                        <h1 className='max-w-4/5 h-28 md:h-40 grid place-items-center text-3xl md:text-4xl whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' >{quiz.name}</h1>
                        <ul className=' w-11/12 md:w-4/5 sm:text-xl py-5 flex flex-col items-center '>
                            {questionsList}
                        </ul>
                        <div className='w-4/5 flex font-normal justify-around text-white' >
                            <Button value='Submit' onClick={submitExam} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StartExam;
