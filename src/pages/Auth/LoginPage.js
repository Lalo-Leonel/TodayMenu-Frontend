import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AuthLayout } from "../../layouts/AuthLayout";
import { OSliderLogin } from "../../components/organisms/OSliderLogin";
import { CardLogin } from "./components/CardLogin";
import { CardRegister } from "./components/CardRegister";

const LoginPage = () => {
  const navigate = useNavigate();
  const [toggleAuth, setToggleAuth] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/main');
    }
  }, [token]);
  
  return (
    <AuthLayout>
      <div className="w-[60rem] bg-base p-2 rounded-2xl">
        <div className="grid grid-cols-[3fr_2fr]">
          <OSliderLogin />
          {toggleAuth ? (
            <CardLogin setToggleAuth={setToggleAuth} />
          ) : (
            <CardRegister setToggleAuth={setToggleAuth} />
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
