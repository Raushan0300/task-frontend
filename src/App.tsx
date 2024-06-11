import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import Task from './components/Task/Task';

function App() {
  const token = localStorage.getItem('token')

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={token?<DashboardPage/>:<LoginPage/>} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/task' element={<Task />} />
      </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
