import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import TokenContext from '../contexts/TokenContext';
import { TiPlus } from 'react-icons/ti';

interface Question {
    question_number: number,
    question: string,
    options: any
}

const serverURL = 'http://localhost:3000';

const AddQuiz = () => {
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext);
    const quizNameRef = useRef<any>(null);
    const percentRef = useRef<any>(null);
    const [questions, setQuestions] = useState<Array<Question>>([{
        question_number: NaN,
        question: '',
        options: {
            1: '',
            2: '',
            3: '',
            4: ''
        }
    }]);
    const [answers, setAnswers] = useState<any>({});

    const addQuestion = () => {
        setAnswers(answers);
        setQuestions([...questions, { question_number: NaN, question: '', options: { 1: '', 2: '', 3: '', 4: '' } }]);
    }
    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        questions[i].question = e.target.value.trim();
    }
    const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
        questions[i].options[j] = e.target.value.trim();
    }
    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        answers[index + 1] = +e.target.value;
    }

    const validateQuiz = () => {
        if (quizNameRef.current?.value.trim().length < 4) {
            alert('Quiz name should be at least 4 characters long.');
            return false;
        }
        if (+percentRef.current?.value < 0 || +percentRef.current?.value > 50) {
            alert('passing percentage should be in range 0 to 50');
            return false;
        }
        for (const [index, ques] of questions.entries()) {
            if (ques.question.length < 3) {
                alert(`Q ${index + 1}. should be at least three characters long`);
                return false;
            }
            for (const option in ques.options) {
                if (!ques.options[option]) {
                    alert(`In Q ${index + 1}, option ${option} must be provided`);
                    return false;
                }
            }
            if (isNaN(answers[index + 1]) || (answers[index + 1] < 1 || answers[index + 1] > 4)) {
                alert(`Invalid answer for Q ${index + 1}`);
                return false;
            }
            questions[index].question_number = index + 1;
        };
        return true;
    }

    const saveQuiz = async () => {
        if (!validateQuiz()) {
            return;
        }
        try {
            const passing_percentage = +percentRef.current?.value || 0;
            const response = await fetch(serverURL + '/quiz', {
                method: 'POST',
                body: JSON.stringify({
                    name: quizNameRef.current?.value,
                    questions_list: questions,
                    answers,
                    passing_percentage
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenContext.token
                }
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert('Quiz saved.');
                navigate('/user');
            } else {
                alert('Quiz name should be unique.');
            }
        } catch (error) {
            alert('Server not working try again later.')
        }
    }

    const questionsList = questions.map((_, index) => {
        return (
            <li className='w-11/12 my-5 sm:my-7 md:my-10' id={'q' + index} key={'q' + index} >
                Q {index + 1} : <input className='border-b-1 w-10/12' type='text' placeholder='Enter your question here...' onChange={(e) => { handleChangeQuestion(e, index) }} defaultValue={_.question} autoComplete='off' />
                <div className='w-full flex flex-col '>
                    <h1>Options :-</h1>
                    <form className='w-11/12 flex flex-col self-center gap-2 *:flex *:gap-4'>
                        <label htmlFor={index + '_1'}>
                            1 .
                            <input id={index + '_1'} type='text' placeholder='Enter your option here...' onChange={(e) => { handleChangeOption(e, index, 1) }} autoComplete='off' />
                        </label>
                        <label htmlFor={index + '_2'}>
                            2.
                            <input id={index + '_2'} type='text' placeholder='Enter your option here...' onChange={(e) => { handleChangeOption(e, index, 2) }} autoComplete='off' />
                        </label>
                        <label htmlFor={index + '_3'}>
                            3.
                            <input id={index + '_3'} type='text' placeholder='Enter your option here...' onChange={(e) => { handleChangeOption(e, index, 3) }} autoComplete='off' />
                        </label>
                        <label htmlFor={index + '_4'}>
                            4.
                            <input id={index + '_4'} type='text' placeholder='Enter your option here...' onChange={(e) => { handleChangeOption(e, index, 4) }} autoComplete='off' />
                        </label>
                    </form>
                    <label htmlFor={'ans_' + index}>
                        Correct Option:
                        <input className='text-center ml-2 sm:ml-3 w-2/5 sm:w-1/5' id={'ans_' + index} type='text' minLength={1} maxLength={1} pattern='[0-9]' placeholder='1, 2, 3 or 4' onChange={(e) => { handleChangeAnswer(e, index) }} autoComplete='off' />
                    </label>
                </div>
            </li>
        );
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='flex flex-col items-center justify-around overflow-y-auto custom-scrollbar'>
                <h1 className='min-h-1/15 sm:min-h-1/10 lg:min-h-1/8 text-xl sm:text-2xl md:text-3xl lg:text-4xl grid place-items-center'>Create a Quiz</h1>
                <div className='w-full h-max flex flex-col items-center justify-between bg-quiz-view-bg text-black gap-3 py-10 md:*:text-xl  lg:*:text-2xl *:font-semibold *:w-11/12 lg:*:w-4/5 [&_input]:outline-none [&_input]:px-1 [&_input]:border-b-1'>
                    <label htmlFor='quiz-name'>
                        Quiz name :
                        <input className='border-b-2 outline-none md:w-lg' type='text' placeholder='Enter a unique quiz name...' ref={quizNameRef} />
                    </label>
                    <label htmlFor='quiz-name'>
                        Passing percentage :
                        <input className='border-b-2 outline-none sm:ml-2 [&::-webkit-inner-spin-button]:hidden' type='number' placeholder='0 to 50 ( optional )...' ref={percentRef} />
                    </label>
                    <h2>Questions</h2>
                    <hr />
                    <ul className='sm:text-xl md:py-10 flex flex-col items-center bg-[#B4E0FF] rounded-2xl'>
                        {questionsList}
                    </ul>
                    <label className='flex' htmlFor='addbtn'>
                        Add a question
                        <button id='addbtn' className='bg-button text-white rounded-full text-xl md:text-2xl min-w-3 min-h-3 sm:min-w-6 sm:min-h-6 md:min-w-8 md:min-h-8 grid place-items-center ml-1 md:ml-2' onClick={addQuestion}><TiPlus title='Add' /></button>
                    </label>
                    <div className='flex justify-center text-white' >
                        <Button value='Save' onClick={saveQuiz} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuiz;
