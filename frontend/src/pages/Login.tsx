import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMailOutline } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import TokenContext from '../contexts/TokenContext';
import logo from '/logo.png';

const serverURL = "http://localhost:3000";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const tokenContext = useContext(TokenContext)

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
        try {
            const response = await fetch(serverURL + "/auth/login", {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: pass
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                tokenContext.setToken(result.data.token);
                localStorage.setItem("token", result.data.token)
                navigate('/user');
            }
            else {
                alert(result.message);
            }
        } catch (error: any) {
            if (error.message === "Failed to fetch") {
                alert("Unfortunately server has stopped. Please try again after some time")
            }
        }

    }

    return (
        <div className='w-full md:w-10/12 lg:w-4/5 h-full flex flex-col justify-center md:gap-10 lg:justify-around items-center'>
            <div className='flex items-center [&_img]:m-2'>
                <img className='w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24' src={logo} alt='quizriousity-logo' />
                <p className='text-4xl md:text-5xl lg:text-6xl'>Login</p>
            </div>
            <form className='flex flex-col w-full h-8/12 justify-center gap-8 md:gap-0 md:justify-around items-center' onSubmit={(e) => loginUser(e)}>
                <div className='grid sm:w-4/5 gap-5 md:gap-10 md:w-4/5 lg:w-2/5 text-2xl *:flex *:flex-col [&_input]:rounded-full [&_input]:bg-input [&_input]:h-10 [&_input]:px-3.5 [&_input]:outline-none [&_input]:border-none'>
                    <AuthInput id={'e-mail'} icon={MdMailOutline} type='email' label='E-mail' ref={emailRef} placeholder="Enter your email..." />
                    <AuthInput id={'pass'} icon={HiOutlineLockClosed} type='password' label='Password' ref={passRef} placeholder="Enter your password..." />
                </div>
                <p className='text-xl'>Don't have an account? <Link className='text-blue-700 underline' to='/register'>Register</Link></p>
                <div className='grid place-items-center '>
                    <Button value='Submit' onClick={null} />
                </div>
            </form>
        </div>
    )
}

export default Login