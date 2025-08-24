import { NavLink } from 'react-router-dom'
import logo from '/logo.png'

const Navbar = () => {
  return (
    <div className='flex h-1/12 justify-between bg-header w-screen '>
      <div className='flex gap-2 items-center p-2'>
        <img src={logo} alt="logo" width={50} height={50} />
        <p className='text-4xl font-semibold'>Quizriousity</p>
      </div>
      <div className='flex h-full items-end *:grid *:place-items-center w-3/5 justify-center gap-6 *:h-3/4 *:w-1/6 *:rounded-t-2xl *:bg-button *:text-2xl *:font-semibold'>
        <NavLink to="/quizzes">Quizzes</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/user" >Dashboard</NavLink>
      </div>
    </div>
  )
}

export default Navbar
