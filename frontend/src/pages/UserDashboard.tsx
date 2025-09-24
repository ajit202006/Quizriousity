import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TokenContext from '../contexts/TokenContext';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '/profile.png';
import BackButton from '../components/BackButton';

interface QuizInterface {
    _id: string,
    name: string
}

const serverURL = "http://localhost:3000";

const UserDashboard = () => {
    const navigate = useNavigate();
    const userId = (useParams()).userId;
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    const [userDetails, setUserDetails] = useState({
        "_id": null,
        "name": "-----",
        "attemptedQuizCount": 0,
        "createdQuizCount": 0,
        "passedCount": 0
    });
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        fetch(serverURL + `/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(result => {
                setUserDetails(result.data.user);
            });
    }, []);

    useEffect(() => {
        fetch(serverURL + `/user/${userId}/quizzes`, {
            headers: {
                "Authorization": "Bearer " + tokenContext.token
            }
        })
            .then(response => response.json())
            .then(result => setQuizzes(result.data))
            .catch(err => console.log(err));
    }, []);

    const quizList = quizzes.map((quiz: QuizInterface) => {
        return (
            <li id={quiz._id} key={quiz._id} onClick={()=>{navigate(`/users/${userId}/quiz/${quiz._id}`)}}>
               {quiz.name} 
            </li>
        );
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <div className='h-1/4 lg:h-2/5 flex relative items-center justify-center gap-8'>
                <img className='h-3/5' src={defaultProfile} alt="profile-image" />
                <h1 className='text-5xl text-center font-semibold whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' title={userDetails.name}>{userDetails.name}</h1>
                <BackButton />
            </div>

            <div className='flex min-h-6/10 overflow-x-scroll snap-x snap-mandatory *:snap-center [&::-webkit-scrollbar]:hidden'>
                <section className='flex flex-col items-center justify-around h-full min-w-full'>
                    <hr className='w-screen'/>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl' >Profile</h1>
                    <div className=' grid gap-2 w-95/100 lg:w-4/5 text-xl md:text-2xl *:flex *:justify-between *:px-10 md:*:px-20 lg:*:px-40'>
                        <hr />
                        <p>Quizzes created <span>{userDetails.createdQuizCount}</span></p>
                        <hr />
                        <p>Quizzes attempted <span>{userDetails.attemptedQuizCount}</span></p>
                        <hr />
                        <p>Exams passed <span>{userDetails.passedCount}</span></p>
                        <hr />
                        <p>Exams failed <span>{userDetails.attemptedQuizCount - userDetails.passedCount}</span></p>
                        <hr />
                    </div>
                    <div className='flex w-4/5 justify-center'>
                        <a href="#quizList"><Button value='User Quizzes' onClick={null} /></a>
                    </div>
                </section>
                <section className='min-w-full' id='quizList'>
                    <ul className='list'>
                        {quizList.length ? quizList : "No user quizzes..."}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default UserDashboard;