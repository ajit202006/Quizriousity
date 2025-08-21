import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import QuizList from '../components/QuizList';

const Quizzes = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <Navbar />
      <SearchBar id='quiz' />
      <hr />
      <QuizList />
    </div>
  )
}

export default Quizzes;