import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import Button from '../components/Button'
import { MdMailOutline, MdPersonOutline } from 'react-icons/md'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'
import logo from '/logo.png'

const serverURL = "http://localhost:3000";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const cpassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  function validateUser(userName: string, email: string, pass: string, cpass: string): Boolean {
    let valid = true;
    if (userName.length < 4) {
      alert("Name should contain at least 4 characters.");
      valid = false;
    } else if (email.length < 5) {
      alert("Email should contain at least 6 characters with an '@' symbol in it.")
    } else if (pass.length < 8) {
      alert("Password should be 8 characters long.");
      valid = false;
    } else if (cpass !== pass) {
      alert("Confirm password should be same as Password");
      valid = false;
    }
    return valid;
  }

  async function registerUser(event: React.FormEvent) {
    event.preventDefault();
    const userName = "" + nameRef.current?.value;
    const email = "" + emailRef.current?.value;
    const pass = "" + passRef.current?.value;
    const cpass = "" + cpassRef.current?.value
    if (!validateUser(userName, email, pass, cpass)) {
      return;
    }
    const response = await fetch(serverURL + "/auth", {
      method: 'POST',
      body: JSON.stringify({
        name: userName,
        email: email,
        password: pass,
        confirm_password: cpass
      }),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
      navigate('/login');
    }
    else {
      alert(data.message);
    }
  }

  return (
    <div className='w-full md:w-10/12 lg:w-4/5 h-full flex flex-col justify-center md:gap-10 lg:justify-around items-center'>
      <div className='flex items-center [&_img]:m-2'>
        <img className='w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24' src={logo} alt='quizriousity-logo'  />
        <p className='text-4xl md:text-5xl lg:text-6xl'>Register</p>
      </div>
      <form className='w-full flex flex-col justify-between items-center' onSubmit={(e) => registerUser(e)}>
        <div className='grid sm:w-4/5 gap-5 md:gap-10 md:w-4/5 lg:w-2/5 text-2xl *:flex *:flex-col [&_input]:rounded-full [&_input]:bg-input [&_input]:h-10 [&_input]:px-3.5 [&_input]:outline-none [&_input]:border-none'>
          <AuthInput id={'username'} icon={MdPersonOutline} type='text' label='Name' ref={nameRef} placeholder="Enter your name..." />
          <AuthInput id={'e-mail'} icon={MdMailOutline} type='email' label='E-mail' ref={emailRef} placeholder="Enter your email..." />
          <AuthInput id={'pass'} icon={HiOutlineLockClosed} type='password' label='Password' ref={passRef} placeholder="Enter your password..." />
          <AuthInput id={'cpass'} icon={BsShieldLock} type='password' label='Confirm Password' ref={cpassRef} placeholder="Confirm your password..." />
        </div>
        <p className='text-xl'>Already have an account? <Link className='text-blue-700 underline' to='/login'>Login</Link></p>
        <div className='grid place-items-center sm:mt-10 m-5'>
          <Button value='Submit' onClick={null} />
        </div>
      </form>
    </div>
  )
}

export default Register
