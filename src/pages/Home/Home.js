import { useSelector } from "react-redux";

import HomeBusiness from "./HomeBusiness/HomeBusiness";
import HomeClient from "./HomeClient/HomeClient";

const HomePage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <>
      {currentUser.role === "client"? <HomeClient />: <HomeBusiness />}
    </>
  );
};

export default HomePage;
