import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import { PageLayout } from './layouts/PageLayout';
import HomePage  from './pages/Home/Home'
import CreateMenu from './pages/menus/Create';

// private routes
const PrivateRoute = ({ component: RouteComponent }) => {
  const token = localStorage.getItem('token');
  if (token)
    return (
      <PageLayout>
        <RouteComponent />
      </PageLayout>
    );
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/main" />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path="/main" element={<PrivateRoute component={HomePage} />} />
      <Route
        path="/menu/create"
        element={<PrivateRoute component={CreateMenu} />}
      />
    </Routes>
  );
}

export default App;
