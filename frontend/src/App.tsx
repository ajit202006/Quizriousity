import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Quizzes from './pages/Quizzes';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import UpdatePassword from './pages/UpdatePassword';
import UserDashboard from './pages/UserDashboard';
import MyQuizzes from './pages/MyQuizzes';
import QuizView from './pages/QuizView';
import AddQuiz from './pages/AddQuiz';
import Review from './pages/Review';
import StartExam from './pages/StartExam';
import EditQuiz from './pages/EditQuiz';

function App() {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-background text-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/quizzes' element={<Quizzes />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/users' element={<Users />} />
        <Route path='/user' element={<Dashboard />} />
        <Route path='/user/update_password' element={<UpdatePassword />} />
        <Route path='/user/:userId/myquizzes' element={<MyQuizzes />} />
        <Route path='/users/:userId/' element={<UserDashboard />} />
        <Route path='/users/:userId/quiz/:quizId' element={<QuizView />} />
        <Route path='/quiz' element={<AddQuiz />} />
        <Route path='/quiz/:quizId' element={<EditQuiz />} />
        <Route path='/users/:userId/quiz/:quizId/reviews/:quizName' element={<Review />} />
        <Route path='/quiz/:quizId/exam' element={<StartExam />} />
      </Routes>
    </div>
  )
}

export default App;