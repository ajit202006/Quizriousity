import { useContext, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import TokenContext from '../contexts/TokenContext';

const serverURL = "http://localhost:3000";
const Users = () => {
    const [users, setUsers] = useState([]);
    const nameRef = useRef<HTMLInputElement>(null);
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODlmMTc3NDhjYTJkNTg4MzUzOTJjODAiLCJpYXQiOjE3NTU3NjkyMzksImV4cCI6MTc1NTc3MjgzOX0.hQJxbRv7PD94A50iANvRU56Bi929_knv-s9ijlgit50"

    // const searchHandler = async () => {
    //     let userName = nameRef.current;
    //     if (!userName?.value || userName.value.length < 3) {
    //         alert("Enter at least 3 characters to search");
    //     } else {
    //         const response = await fetch(serverURL + "/user/search", {
    //             method: "POST",
    //             body: JSON.stringify({ userName:userName.value }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bearer " + token
    //             }
    //         });
    //         const result = await response.json();
    //         setUsers(result.data);
    //     }
    // }

    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <SearchBar id='user' clickEvent={null} ref={nameRef} />
            <hr />
            <UserList users={users} />
        </div>
    )
}

export default Users;