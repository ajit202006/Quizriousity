import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-between md:justify-around lg:justify-between w-4/5 h-4/5'>
      <div className='flex flex-col sm:flex-row items-center '>
        <img className='drop-shadow-lg/30 w-48 h-48 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[200px] lg:h-[200px] ' src={logo} alt="logo" />
        <div className="grid place-items-center  *:text-shadow-lg/20 ">
          <h1 className='text-5xl md:text-6xl lg:text-8xl'>Quizriousity</h1>
          <p className='text-2xl md:text-3xl lg:text-4xl'>Cultivating Curiousity</p>
        </div>
      </div>
      <div className='flex flex-col w-full justify-around gap-6 *:h-14 sm:h-44 sm:*:h-1/3 md:flex-row md:w-3/5 lg:font-semibold *:grid *:place-items-center *:rounded-xl *:bg-button lg:*:rounded-2xl text-2xl md:text-3xl lg:text-4xl md:*:w-4/10 lg:*:w-3/10 md:*:h-20 lg:*:h-[100px] '>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/login'><button>Login</button></Link>
      </div>
    </div>
  )
}

export default Home;
