import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Quizzes from './pages/Quizzes';
import Reports from './pages/Reports';
import Users from './pages/Users';

function App() {
  return (
      <div className='h-screen w-screen flex items-center justify-center bg-[#429BB7] text-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quizzes' element={<Quizzes />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
  )
}

export default App
