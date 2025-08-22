import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TokenContext from '../contexts/TokenContext';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '/profile.png';
import BackButton from '../components/BackButton';

const serverURL = "http://localhost:3000";

const UserDashboard = () => {
    const navigate = useNavigate();
    const userId = (useParams()).userId;
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODlmMTc3NDhjYTJkNTg4MzUzOTJjODAiLCJpYXQiOjE3NTU3NzY3MjAsImV4cCI6MTc1NTc4MDMyMH0.1_EY4YzWVhg4sT0e6WcpIP8xzhl03E1vcgJQH6wAk84"
    const [userDetails, setUserDetails] = useState({
        "_id": null,
        "name": "-----",
        "attemptedQuizCount": 0,
        "createdQuizCount": 0,
        "passedCount": 0
    });
    useEffect(() => {
        fetch(serverURL + `/${userId}/quizzes`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(result => setUserDetails(result.data.user));
    });
    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <div className='h-2/5 flex relative items-center justify-center gap-8'>
                <img className='h-3/5' src={defaultProfile} alt="profile-image" />
                <h1 className='text-5xl text-center font-semibold whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' title={userDetails.name}>{userDetails.name}</h1>
                <BackButton toPath='/users' title='Users'/>
            </div>
            <hr />
            <div className='flex flex-col items-center justify-around min-h-6/12 max-h-full'>
                <h1 className='text-4xl' >Profile</h1>
                <div className='w-4/5 text-2xl grid gap-2 *:flex *:justify-between *:px-40'>
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
                    <Button value='User quizzes' onClick={() => navigate('/:userId/quizzes')} />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;