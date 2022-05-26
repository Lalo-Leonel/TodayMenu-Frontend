import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import { PageLayout } from './layouts/PageLayout';
import HomePage  from './pages/Home/Home'
import CreateMenu from './pages/Menus/Create';
import List from './pages/Business/List';
import RequestMenu from './pages/Menus/Request';
import CreateBusiness from './pages/Business/Create';
import Profile from './pages/Profile/Index'

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
      <Route
        path="/menu/listbusiness"
        element={<PrivateRoute component={List} />}
      />
      <Route
        path="/menu/request/:id"
        element={<PrivateRoute component={RequestMenu} />}
      />
      <Route
        path="/business/create"
        element={<PrivateRoute component={CreateBusiness} />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute component={Profile} />}
      />
    </Routes>
  );
}

export default App;
