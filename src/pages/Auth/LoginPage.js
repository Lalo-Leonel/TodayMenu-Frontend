import { useState } from "react";

import { AuthLayout } from "../../layouts/AuthLayout";
import { OSliderLogin } from "../../components/organisms/OSliderLogin";
import { CardLogin } from "./components/CardLogin";
import { CardRegister } from "./components/CardRegister";

const LoginPage = () => {
  const [toggleAuth, setToggleAuth] = useState(true);
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
