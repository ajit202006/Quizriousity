import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { TiPlus } from 'react-icons/ti';
import { useContext, useEffect, useRef, useState } from 'react';
import TokenContext from '../contexts/TokenContext';
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';

interface ReviewInterface {
    _id: string,
    userId: string,
    quizId: string,
    userName: string,
    rating: number,
    feedback: string
}

const serverURL = 'http://localhost:3000';

const Review = () => {
    const params = useParams();
    const navigate = useNavigate();
    const feedbackRef = useRef<HTMLTextAreaElement>(null);
    const tokenContext = useContext(TokenContext);
    const [reviews, setReviews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(0);
    const [reloader, setReloader] = useState(true);
    const [myReview, setMyReview] = useState({ rating: -1, feedback: '' });

    useEffect(() => {
        fetch(serverURL + `/quiz/${params.quizId}/reviews`, {
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    setReviews(result.data);
                    setMyReview(result.data.filter((review: ReviewInterface) => review.userId === tokenContext.userId)[0]);
                } else {
                    setMyReview({ rating: -1, feedback: '' });
                    setReviews([]);
                }
            })
    }, [reloader]);

    const addReview = async () => {
        if (rating === 0) {
            alert('Review cannot be added without rating');
            return;
        }
        const response = await fetch(serverURL + `/quiz/${params.quizId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({ rating, feedback: feedbackRef.current?.value }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenContext.token
            }
        });
        const result = await response.json();
        if (result.status === 'success') {
            setIsEditing(false);
            setReloader(!reloader);
        } else {
            alert(result.message);
        }
    }

    const deleteReview = async () => {
        const response = await fetch(serverURL + `/quiz/${params.quizId}/reviews`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + tokenContext.token
            }
        });
        const result = await response.json();
        if (result.status === 'success') {
            setReloader(!reloader);
        } else {
            alert(result.message);
        }
    }


    const reviewsList = reviews.map((review: ReviewInterface) => {
        return (
            <li id={review._id} key={review._id} className='text-xl text-black md:text-2xl lg:text-3xl flex my-2 w-full h-max rounded-2xl bg-li justify-center '>
                <div className='w-95/100 flex flex-col gap-3 py-4 break-words'>
                    {review.feedback}
                    <div className='text-[12px] sm:text-[16px] md:text-xl flex w-full justify-between *:text-[#B3B3B3] font-semibold'>
                        <span>by : {review.userName}</span><span>rating : {review.rating}/5</span>
                    </div>
                </div>
            </li>
        )
    });


    return (
        <div className='w-full h-full relative'>
            <div className={`w-full h-full ${isEditing ? 'blur-xs pointer-events-none' : ''}`}>
                <Header />
                <h1 className='w-3/5 h-2/12 mx-auto grid place-items-center text-2xl sm:text-3xl md:text-4xl whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden md:font-semibold' >
                    {params.quizName}
                </h1>
                <div className='flex justify-center items-center w-full *:w-90/100 md:*:w-4/5'>
                    <div className=' w-9/10 h-1/12 flex justify-between'>
                        <h1 className={`${myReview.rating !== -1 ? 'w-1/5' : 'w-1/7'} text-2xl sm:text-3xl md:text-4xl flex items-center justify-between md:font-semibold 
                        [&_button]:bg-button [&_button]:ml-3 [&_button]:min-w-7 [&_button]:min-h-7 lg:[&_button]:min-w-9 lg:[&_button]:min-h-9 [&_button]:rounded-full [&_button]:text-xl lg:[&_button]:text-2xl [&_button]:grid [&_button]:place-items-center`}>
                            Reviews
                            <button onClick={() => { setIsEditing(true) }}>
                                {myReview.rating !== -1 ? <HiPencilAlt title='Edit' /> : <TiPlus title='Add' />}
                            </button>
                            {myReview.rating !== -1 &&
                                <button title='Delete' onClick={deleteReview}>
                                    <HiOutlineTrash />
                                </button>
                            }
                        </h1>
                        <Button value='Go to quiz' onClick={() => { navigate(-1) }} />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full h-2/3 my-2 *:w-95/100 md:*:w-4/5'>
                    <ul className='h-full overflow-auto custom-scrollbar pr-3'>
                        {reviewsList.length ? reviewsList : 'No reviews till now. Be the first to add one.'}
                    </ul>
                </div>
            </div>

            <div className={`${isEditing ? 'scale-100' : 'scale-0'} transition-[scale] absolute w-full h-full md:w-3/5 sm:h-4/5 flex flex-col items-center justify-center gap-4 bg-quiz-view-bg top-0 sm:top-1/10 md:left-1/5 md:rounded-3xl`}>
                <div className='flex gap-5 text-black [&_label]:flex [&_label]:flex-col [&_label]:items-center text-2xl font-semibold'>
                    <p>Rating: </p>
                    <label htmlFor='1'><input type='radio' className='custom-radio-button' name='rating' onClick={() => { setRating(1) }} />1</label>
                    <label htmlFor='2'><input type='radio' className='custom-radio-button' name='rating' onClick={() => { setRating(2) }} />2</label>
                    <label htmlFor='3'><input type='radio' className='custom-radio-button' name='rating' onClick={() => { setRating(3) }} />3</label>
                    <label htmlFor='4'><input type='radio' className='custom-radio-button' name='rating' onClick={() => { setRating(4) }} />4</label>
                    <label htmlFor='5'><input type='radio' className='custom-radio-button' name='rating' onClick={() => { setRating(5) }} />5</label>
                </div>
                <textarea className='bg-button w-4/5 h-3/5 resize-none rounded-xl outline-none px-4 py-2 text-2xl custom-scrollbar' name="" id="" placeholder='Feedback (optional)...' ref={feedbackRef} defaultValue={myReview.feedback}></textarea>
                <div className='flex justify-around w-full'>
                    <Button onClick={addReview} value='Submit' />
                    <Button onClick={() => { setIsEditing(false) }} value='Cancel' />
                </div>
            </div>
        </div>
    )
}

export default Review