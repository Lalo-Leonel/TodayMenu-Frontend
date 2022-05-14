import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;
