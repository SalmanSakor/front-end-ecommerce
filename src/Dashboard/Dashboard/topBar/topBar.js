import {
  faBars,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../../Context/menu";
import { Axios } from "../../../axios/axios";
import { USER, LOGOUT } from "../../../api/api";
import Cookie from "cookie-universal";
import { Width } from "../../../Context/width";

const TopBar = () => {
  const cookie = Cookie();
  const [name, setName] = useState("");

  // menuContext
  const menuContext = useContext(Menu);
  const setIsOpen = menuContext.setIsOpen;
  const isOpen = menuContext.isOpen;

  // widthContext
  const widthContext = useContext(Width);
  const widthWindow = widthContext.windowWidth;

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  // handle
  const handleLink = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = async () => {
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
          onClick={handleLink}
          className="icon-topBar"
        />
      </div>
      <div className="flex2-topBar">
        {name.split(" ").slice(0, 1)}

        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={handleClick}
          className="icon-topBar"
        />
      </div>
    </div>
  );
};

export default TopBar;
