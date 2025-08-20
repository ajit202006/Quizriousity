import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import logo from '/logo.png';
import { MdMailOutline } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';

const serverURL = "http://localhost:3000";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [token, setToken] = useState("");

    const navigate = useNavigate();
    function validateUserLogin(email: string, pass: string): Boolean {
        if (email.length < 5) {
            alert("Email should contain at least 6 characters with an '@' symbol in it.")
        } else if (pass.length < 8) {
            alert("Password should be 8 characters long.");
        } else {
            return true;
        }
        return false;
    }

    async function loginUser(event: React.FormEvent) {
        event.preventDefault();
        const email = "" + emailRef.current?.value;
        const pass = "" + passRef.current?.value;
        if (!validateUserLogin(email, pass)) {
            return;
        }
        const response = await fetch(serverURL + "/auth/login", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: pass
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if (data.status === "success") {
            alert(data.message);
            setToken(data.data.token);
            navigate('/login');
        }
        else {
            alert(data.message);
        }
    }

    return (
        <div className='w-4/5 h-full flex flex-col justify-around items-center'>
            <div className='flex items-center [&_img]:m-2'>
                <img src={logo} alt='quizriousity-logo' width={95} height={95} />
                <p className='text-6xl'>Login</p>
            </div>
            <form className='flex flex-col w-full h-8/12 justify-around items-center' onSubmit={(e) => loginUser(e)}>
                <div className='grid gap-10 w-2/5 text-2xl *:flex *:flex-col [&_input]:rounded-full [&_input]:bg-[#7dcdff] [&_input]:h-10 [&_input]:px-3.5 [&_input]:outline-none [&_input]:border-none'>
                    <AuthInput id={'e-mail'} icon={MdMailOutline} type='email' label='E-mail' ref={emailRef} placeholder="Enter your email..." />
                    <AuthInput id={'pass'} icon={HiOutlineLockClosed} type='password' label='Password' ref={passRef} placeholder="Enter your password..." />
                </div>
                <p className='text-xl'>Don't have an account? <Link className='text-blue-700 underline' to='/register'>Register</Link></p>
                <div className='grid place-items-center m-5'>
                    <Button value='Submit' onClick={null} />
                </div>
            </form>
        </div>
    )
}

export default Login
