import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-between w-4/5 h-4/5'>
      <div className='flex items-center'>
        <img className='drop-shadow-lg/30' src={logo} alt="logo" height={200} width={200} />
        <div className="grid place-items-center  *:text-shadow-lg/20 ">
          <h1 className='text-8xl'>Quizriousity</h1>
          <p className='text-4xl'>Cultivating Curiousity</p>
        </div>
      </div>
      <div className='flex w-3/5 justify-around *:w-3/10 *:h-[100px] *:grid *:place-items-center *:bg-button *:rounded-2xl text-4xl font-semibold'>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/login'><button>Login</button></Link>
      </div>
    </div>
  )
}

export default Home;
