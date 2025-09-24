import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from "react-icons/io5";
import logo from '/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-10 sm:min-h-1/12 justify-between bg-header w-screen relative'>
      <div className='flex gap-2 items-center p-2'>
        <img className='w-6 h-6 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]' src={logo} alt='logo' />
        <p className='text-2xl sm:text-3xl md:text-4xl md:font-semibold'>Quizriousity</p>
      </div>
      <div className={`z-10 absolute top-10 ${isOpen?'scale-y-100':'scale-y-0'} transition-[scale] origin-top *:border-y-1 *:border-collapse *:border-white lg:*:border-0 *:bg-header lg:transition-none lg:scale-100 sm:top-1/1 right-0 lg:top-0 lg:relative *:px-2 *:py-1.5 lg:mt-0 lg:*:p-0 lg:flex-row lg:flex h-full lg:items-end *:grid *:place-items-center lg:w-3/5 lg:justify-center lg:gap-6 lg:*:h-3/4 lg:*:w-1/6 lg:*:rounded-t-2xl lg:*:bg-button *:text-xl xl:*:text-2xl lg:*:font-semibold`}>
        <NavLink to='/quizzes'>Quizzes</NavLink>
        <NavLink to='/reports'>Reports</NavLink>
        <NavLink to='/users'>Users</NavLink>
        <NavLink to='/user' >Dashboard</NavLink>
      </div>
      {
        isOpen ?
        <IoClose className='lg:hidden text-2xl self-center mr-5' onClick={() => { setIsOpen(false) }} />
        :
        <IoMenu className='lg:hidden w-5 h-5 self-center mr-5' onClick={() => { setIsOpen(true) }} />
      }
    </div>
  )
}

export default Navbar
