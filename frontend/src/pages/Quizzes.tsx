import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import QuizList from '../components/QuizList';
import { useRef } from 'react';

const Quizzes = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div className='w-full h-full flex flex-col'>
      <Navbar />
      <SearchBar id='quiz' clickEvent={null} ref={nameRef}/>
      <hr />
      <QuizList />
    </div>
  )
}

export default Quizzes;