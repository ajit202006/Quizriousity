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

    const searchHandler = async () => {
        let userName = nameRef.current;
        if (!userName?.value || userName.value.length < 3) {
            alert("Enter at least 3 characters to search");
        } else {
            const response = await fetch(serverURL + "/user/search", {
                method: "POST",
                body: JSON.stringify({ userName:userName.value }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            const result = await response.json();
            setUsers(result.data);
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <Navbar />
            <SearchBar id='user' clickEvent={searchHandler} ref={nameRef} />
            <hr />
            <UserList users={users} />
        </div>
    )
}

export default Users;