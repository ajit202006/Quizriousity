import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPencilAlt, HiOutlineTrash, HiOutlineUpload } from 'react-icons/hi';
import Button from '../components/Button';
import Header from '../components/Header';
import TokenContext from '../contexts/TokenContext';
import { TiPlus } from 'react-icons/ti';

interface QuizInterface {
    _id: string,
    name: string
}

const serverURL = 'http://localhost:3000';

const MyQuizzes = () => {
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext);
    const [published, setPublished] = useState([]);
    const [unpublished, setUnpublished] = useState([]);
    const [isPublished, setIsPublished] = useState(true);
    const [reloader, setReloader] = useState(false);
    useEffect(() => {
        fetch(serverURL + `/user/${tokenContext.userId}/quizzes`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => setPublished(result.data))
            .catch(err => console.log(err));
    }, [reloader, isPublished]);

    useEffect(() => {
        fetch(serverURL + `/user/${tokenContext.userId}/quizzes/unpublished`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => setUnpublished(result.data))
            .catch(err => console.log(err));
    }, [reloader, isPublished]);

    const publishQuiz = async (quizId: string) => {
        const response = await fetch(serverURL + '/quiz/publish', {
            method: 'PATCH',
            body: JSON.stringify({ quizId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
        const result = await response.json();
        if (result.status === 'success') {
            setReloader(!reloader);
        } else {
            alert(result.message);
        }
    }

    const deleteQuiz = async (quizId: string) => {
        const response = await fetch(serverURL + `/quiz/${quizId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
        const result = await response.json();
        if (result.status === 'success') {
            setReloader(!reloader);
        } else {
            alert(result.message);
        }
    }

    const publishedList = published.map((quiz: QuizInterface) => {
        return (
            <li id={quiz._id} key={quiz._id}>
                <p className='list-item'>{quiz.name}</p>
            </li>
        )
    })

    const unpublishedList = unpublished.map((quiz: QuizInterface) => {
        return (
            <li className='flex justify-between' id={quiz._id} key={quiz._id}>
                <p className='list-item'>{quiz.name}</p>
                <div className='flex justify-around w-4/10 pl-1 gap-2 lg:gap-0 lg:w-1/5 text-xl md:text-2xl lg:text-4xl'>
                    <button onClick={() => { navigate(`/quiz/${quiz._id}`) }}>{<HiPencilAlt />}</button>
                    <button onClick={() => { deleteQuiz(quiz._id) }}>{<HiOutlineTrash />}</button>
                    <button onClick={() => { publishQuiz(quiz._id) }}>{<HiOutlineUpload />}</button>
                </div>
            </li>
        )
    })

    const myList = isPublished ? publishedList : unpublishedList;
    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='flex relative sm:text-xl md:text-3xl lg:text-4xl items-center justify-around min-h-1/8 md:min-h-1/6'>
                <Button value='Dashboard' onClick={() => navigate('/user')} />
                <h1 className='flex items-center gap-2'>
                    My Quizzes
                    <button className='bg-button text-white rounded-full min-w-2 min-h-2 sm:min-h-4 sm:min-w-4 md:min-w-8 md:min-h-8 grid place-items-center' onClick={() => navigate('/quiz')}><TiPlus title='Create quiz' /></button>
                </h1>
                <Button value='Quizzes' onClick={() => navigate('/quizzes')} />
            </div>
            <div className='flex justify-around min-h-1/18 md:min-h-1/15 lg:min-h-1/12 md:*:text-2xl lg:*:text-3xl *:w-full'>
                <button className={isPublished ? 'bg-[#4ABFEE]' : 'bg-[#889FE5]'} onClick={() => setIsPublished(true)} >Published</button>
                <button className={isPublished ? 'bg-[#889FE5]' : 'bg-[#4ABFEE]'} onClick={() => setIsPublished(false)}>Unpublished</button>
            </div>
            <div className='h-full lg:h-2/3 bg-[#4ABFEE]'>
                <ul className='list'>
                    {myList.length ? myList : 'Nothing to display'}
                </ul>
            </div>
        </div>
    )
}

export default MyQuizzes;