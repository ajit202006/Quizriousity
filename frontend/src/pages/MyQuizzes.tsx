import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Button from '../components/Button';
import Header from '../components/Header';

const MyQuizzes = () => {
    const published = [{ _id: "null", name: "---" }];
    const unpublished = [{ _id: "null", name: "---" }];
    const [isPublished, setIsPublished] = useState(true);
    //   const nameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const publishedList = published.map((quiz) => {
        return (
            <li id={quiz._id} key={quiz._id}>
                <p className='list-item'>{quiz.name}</p>
            </li>
        )
    })
    const unpublishedList = unpublished.map((quiz) => {
        return (
            <li className='flex justify-between' id={quiz._id} key={quiz._id}>
                <p className='list-item'>{quiz.name}</p>
                <div className='flex justify-around w-1/5 text-4xl'>
                    <button>{<HiPencilAlt />}</button>
                    <button>{<HiOutlineTrash />}</button>
                </div>
            </li>
        )
    })
    const myList = isPublished ? publishedList : unpublishedList;
    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='flex relative text-4xl items-center justify-around min-h-1/6'>
                <Button value='Dashboard' onClick={() => navigate('/user')} />
                <h1>My Quizzes</h1>
                <Button value='Quizzes' onClick={() => navigate('/quizzes')} />
            </div>
            <div className='flex justify-around min-h-1/12 *:text-3xl *:w-full'>
                <button className={isPublished ? "bg-[#4ABFEE]" : "bg-[#889FE5]"} onClick={() => setIsPublished(true)} >Published</button>
                <button className={isPublished ? "bg-[#889FE5]" : "bg-[#4ABFEE]"} onClick={() => setIsPublished(false)}>Unpublished</button>
            </div>
            <div className='h-2/3 '>
                <ul className='list'>
                    {myList}
                </ul>

            </div>

        </div>
    )
}

export default MyQuizzes;