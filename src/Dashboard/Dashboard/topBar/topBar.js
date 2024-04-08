import {
  faBars,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { OpenSide } from "../../../Context/sideOpen";
import { Axios } from "../../../axios/axios";
import { USER, LOGOUT } from "../../../api/api";
import Cookie from "cookie-universal";
import { Width } from "../../../Context/width";
import { Pop } from "../../../Context/pop-up";

const TopBar = () => {
  const cookie = Cookie();
  const token = cookie.get("token");
  const [name, setName] = useState("");

  // menu side-bar Context
  const menuContext = useContext(OpenSide);
  const setIsOpen = menuContext.setIsOpenSide;
  const isOpen = menuContext.isOpenSide;
  // popUpContext
  const popContext = useContext(Pop);
  const setIsPop = popContext.setIsPop;
  const isPop = popContext.isPop;
  // widthContext
  const widthContext = useContext(Width);
  const widthWindow = widthContext.windowWidth;

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  // handle click icon sideBar
  const handleClickIcon = () => {
    setIsOpen((prev) => !prev);
  };
  // handle click pop-up
  const handleClickIconLogout = () => {
    setIsPop((prev) => !prev);
  };
  const logoutHandler = async () => {
    try {
      await Axios.get(`${LOGOUT}`);
      cookie.remove("token");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="topBar">
      <div className="flex1-topBar">
        {widthWindow > 768 && (
          <div className="link-topBar hidden">Dashboard</div>
        )}
        <FontAwesomeIcon
          icon={widthWindow <= 768 && !isOpen ? faXmark : faBars}
          onClick={handleClickIcon}
          className="icon-topBar"
        />
      </div>
      <div className="flex2-topBar">
        {name.split(" ").slice(0, 1)}

        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={handleClickIconLogout}
          className="icon-topBar"
        />
      </div>
      <>
        {/* pop-up */}
        {!isPop && token && (
          <div className="pop-up">
            <div style={{ letterSpacing: "1px" }}>confirm logout ?</div>
            <div className="pop-up-flex">
              <div className="btn-submit" onClick={handleClickIconLogout}>
                cancel
              </div>
              <div onClick={logoutHandler} className="btn-submit">
                logout
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default TopBar;
