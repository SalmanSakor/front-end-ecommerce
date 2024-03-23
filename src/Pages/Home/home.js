import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/header";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home-header">
          <Header />
        </div>
        <div className="home-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
