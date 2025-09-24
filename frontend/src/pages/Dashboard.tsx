import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TokenContext from '../contexts/TokenContext';
import Button from '../components/Button';
import defaultProfile from '/profile.png';
import { HiPencilAlt } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';

const serverURL = 'http://localhost:3000';

const Dashboard = () => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const tokenContext = useContext(TokenContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [userDetails, setUserDetails] = useState({
        '_id': null,
        'name': '-----',
        'email': '-----',
        'attemptedQuizCount': 0,
        'createdQuizCount': 0,
        'passedCount': 0
    });
    const token = tokenContext.token;

    useEffect(() => {
        fetch(serverURL + '/user', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(result => {
                setUserDetails(result.data.user);
                setNewName(result.data.user.name);
                localStorage.setItem('userId', result.data.user._id);
                tokenContext.setUserId(result.data.user._id);
            });
    }, []);

    const updateHandler = async () => {
        const userName = nameRef.current?.value;

        if (!userName || !userName.length || userName.length < 3) {
            alert('Name should be at least 3 characters long.');
            return;
        }
        if (userName === userDetails.name) {
            setIsEditing(false);
            return;
        }
        const response = await fetch(serverURL + '/user', {
            method: 'PUT',
            body: JSON.stringify({ _id: tokenContext.userId, name: userName }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenContext.token
            }
        });
        const result = await response.json();
        if (result.status === 'success') {
            userDetails.name = userName;
        } else {
            alert(result.message);
        }
        setIsEditing(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    return (
        <div className='w-full h-full relative'>
            <div className={`w-full h-full flex flex-col ${isEditing ? 'blur-xs' : ''}`}>
                <Navbar />
                <div className='h-2/5 flex flex-col items-center sm:grid sm:place-items-center sm:grid-flow-col sm:grid-cols-4 sm:grid-rows-4 lg:grid-cols-6 lg:grid-rows-6 lg:gap-y-0 '>
                    <img className='h-40 w-40 mt-2.5 sm:mt-0 sm:w-auto sm:h-3/5 sm:col-start-1 sm:col-end-3 sm:row-span-4 lg:col-start-3 lg:row-span-6' src={defaultProfile} alt='profile-image' />
                    <h1 className='text-3xl sm:text-5xl sm:col-start-3 sm:row-start-2 text-center md:font-semibold lg:col-start-4 lg:row-start-3 max-w-28 sm:max-w-full h-14 sm:min-h-16 whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden' title={userDetails.name}>{userDetails.name}</h1>
                    <p className='text-[14px] sm:text-2xl sm:col-start-3 sm:row-start-3 lg:col-start-4 lg:row-start-4 text-[#B9B9B9] md:font-semibold'>{userDetails.email}</p>
                    <button className='absolute top-52 right-20 sm:top-0 sm:right-0 sm:relative text-3xl sm:text-6xl sm:col-start-4 sm:row-start-2 lg:col-start-5 lg:row-start-2 lg:row-span-3 lg:-ml-36' onClick={() => setIsEditing(true)}><HiPencilAlt /></button>
                </div>
                <hr />
                <div className='flex flex-col items-center justify-around min-h-6/12 max-h-full'>
                    <h1 className='text-2xl md:text-4xl' >Profile</h1>
                    <div className='w-95/100 lg:w-4/5 text-xl md:text-2xl grid gap-2 *:flex *:justify-between *:px-10 md:*:px-20 lg:*:px-40 *:relative'>
                        <hr />
                        <p>Quizzes created <span>{userDetails.createdQuizCount}</span><FiPlus className='absolute right-0 my-auto text-2xl md:text-3xl' onClick={() => navigate('/quiz')} title='Create quiz' /></p>
                        <hr />
                        <p>Quizzes attempted <span>{userDetails.attemptedQuizCount}</span><FiPlus className='absolute right-0 my-auto text-2xl md:text-3xl' onClick={() => navigate('/quizzes')} title='Quizzes' /></p>
                        <hr />
                        <p>Exams passed <span>{userDetails.passedCount}</span></p>
                        <hr />
                        <p>Exams failed <span>{userDetails.attemptedQuizCount - userDetails.passedCount}</span></p>
                        <hr />
                    </div>
                    <div className='flex w-4/5 justify-around'>
                        <Button value='My quizzes' onClick={() => navigate(`/user/${userDetails._id}/myquizzes`)} />
                        <Button value='Change password' onClick={() => navigate('/user/update_password')} />
                    </div>
                </div>
            </div>
            <div className={`${isEditing ? 'scale-100' : 'scale-0'} transition-[scale] absolute sm:w-4/5 sm:h-3/5 lg:w-1/3 lg:h-1/2 flex flex-col items-center justify-center gap-8 bg-quiz-view-bg w-full h-1/2 top-1/4 sm:left-1/10 sm:top-1/5 lg:top-1/4 lg:left-1/3 sm:rounded-3xl `}>
                <input type='text' className='bg-input text-2xl w-4/5 outline-none rounded-xl p-2' value={newName}
                    onChange={(e) => handleChange(e)} ref={nameRef} />
                <div className='flex flex-col sm:flex-row gap-5'>
                    <Button onClick={updateHandler} value='Update' />
                    <Button onClick={() => {
                        setIsEditing(false);
                        setNewName(userDetails.name)
                    }} value='Cancel' />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;