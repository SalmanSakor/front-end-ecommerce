import { useEffect, useState } from "react";
import { Axios } from "../../../axios/axios";
import { USER } from "../../../api/api";
import { Outlet, NavLink } from "react-router-dom";
import TopBar from "../topBar/topBar";
import SideBar from "../sideBar/sideBar";
import { Data } from "../sideBar/sideLinks";
import { OpenSide } from "../../../Context/sideOpen";
import { Width } from "../../../Context/width";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const [role, setRole] = useState("");

  // menu side-bar Context
  const openContext = useContext(OpenSide);
  const isOpen = openContext.isOpenSide;

  // widthContext
  const widthContext = useContext(Width);
  const widthWindow = widthContext.windowWidth;

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setRole(data.data.role))
      .catch((err) => console.log(err));
  }, []);

  const result = Data.map(
    (item, index) =>
      item.role.includes(role) && (
        <div key={index}>
          <NavLink to={item.path} className="nav-side-open">
            <FontAwesomeIcon icon={item.icon} className="icon-sideBar" />
            <div>{item.name}</div>
          </NavLink>
          <hr />
        </div>
      )
  );
  return (
    <>
      <div className="parent-dashboard">
        <div className="container">
          <div className="child-dashboard">
            <div className="grand-topBar">
              <TopBar />
            </div>

            <div className="grand-sideBar">
              <div
                className="links-sideBar"
                style={{
                  width: isOpen ? "20%" : "10%",
                  position: widthWindow <= 768 && "fixed",
                  left: widthWindow <= 768 && "-100%",
                }}
              >
                <SideBar />
              </div>

              {widthWindow <= 768 && !isOpen && (
                <div className="layout-sideBar">{result}</div>
              )}

              <div
                className="outlet-sideBar"
                style={{
                  width:
                    isOpen && widthWindow > 768
                      ? "80%"
                      : !isOpen && widthWindow > 768
                      ? "90%"
                      : "100%",
                }}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
