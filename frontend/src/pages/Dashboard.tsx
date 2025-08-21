import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TokenContext from '../contexts/TokenContext';
import Button from '../components/Button';
import defaultProfile from '/profile.png';
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const serverURL = "http://localhost:3000";

const Dashboard = () => {
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODlmMTc3NDhjYTJkNTg4MzUzOTJjODAiLCJpYXQiOjE3NTU3NzY3MjAsImV4cCI6MTc1NTc4MDMyMH0.1_EY4YzWVhg4sT0e6WcpIP8xzhl03E1vcgJQH6wAk84"
    const [userDetails, setUserDetails] = useState({
        "_id": null,
        "name": "-----",
        "email": "-----",
        "attemptedQuizCount": 0,
        "createdQuizCount": 0,
        "passedCount": 0
    });
    useEffect(() => {
        fetch(serverURL + "/user", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(result => setUserDetails(result.data.user));
    })
    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <div className='h-2/5 grid place-items-center grid-flow-col grid-cols-6 grid-rows-6 gap-y-0'>
                <img className='h-3/5 col-start-3 row-span-6' src={defaultProfile} alt="profile-image" />
                <h1 className='text-5xl text-center font-semibold col-start-4 row-start-3 w-full min-h-16 whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' title={userDetails.name}>{userDetails.name}</h1>
                <button className='text-6xl col-start-5 row-start-2 row-span-3 -ml-36'><HiPencilAlt/></button>
                <p className='text-2xl col-start-4 row-start-4 text-[#B9B9B9] font-semibold'>{userDetails.email}</p>
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
                <div className='flex w-4/5 justify-around'>
                    <Button value='My quizzes' onClick={()=>navigate('/quizzes')}/>
                    <Button value='Change password' onClick={()=>navigate('/')}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;