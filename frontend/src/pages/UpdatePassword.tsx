import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import Button from '../components/Button'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'
import Header from '../components/Header'
import TokenContext from '../contexts/TokenContext'
import BackButton from '../components/BackButton'

const serverURL = "http://localhost:3000";

const UpdatePassword = () => {
  const passRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const cpassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const tokenContext = useContext(TokenContext);

  const validateInput = () => {
    if (!passRef.current?.value || passRef.current?.value.length < 8) {
      alert("Current password is too small");
    } else if (!newPassRef.current?.value || newPassRef.current?.value.length < 8) {
      alert("New password is too small");
    } else if (newPassRef.current?.value === passRef.current?.value) {
      alert("New password cannot be same as current password.");
    } else if (newPassRef.current?.value !== cpassRef.current?.value) {
      alert("Confirm password should be same as new password.");
    } else {
      return true;
    }
    return false;
  }

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }

    const response = await fetch(serverURL + '/user/update_password', {
      method: 'PUT',
      body: JSON.stringify({
        _id: tokenContext.userId,
        current_password: passRef.current?.value,
        new_password: newPassRef.current?.value,
        confirm_password: cpassRef.current?.value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenContext.token
      }
    });
    const result = await response.json();
    if (result.status === 'success') {
      navigate('/user');
    } else {
      alert(result.message);
    }
  }

  return (
    <div className='w-full h-full'>
      <Header />
      <div className='h-11/12 flex flex-col justify-around items-center relative'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl'>Change Password</h1>
        <BackButton/>
        <form className='w-full h-5/7 flex flex-col justify-between items-center' onSubmit={(e) => updatePassword(e)}>
          <div className='grid gap-10 w-4/5 lg:w-2/5 text-xl lg:text-2xl *:flex *:flex-col [&_input]:rounded-full [&_input]:bg-input [&_input]:h-10 [&_input]:px-3.5 [&_input]:outline-none [&_input]:border-none'>
            <AuthInput id={'pass'} icon={HiOutlineLockClosed} type='password' label='Current Password' ref={passRef} placeholder="Enter current password..." />
            <AuthInput id={'newPass'} icon={HiOutlineLockClosed} type='password' label='New Password' ref={newPassRef} placeholder="Enter new password..." />
            <AuthInput id={'cpass'} icon={BsShieldLock} type='password' label='Confirm Password' ref={cpassRef} placeholder="Confirm your password..." />
          </div>
          <div className='grid place-items-center m-5'>
            <Button value='Submit' onClick={null} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword;
