import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Open } from "../../../Context/isOpen";
import { Axios } from "../../../axios/axios";
import { USER, LOGOUT } from "../../../api/api";
import Cookie from "cookie-universal";
import { Width } from "../../../Context/width";

const TopBar = () => {
  const cookie = Cookie();
  const [name, setName] = useState("");

  // openContext
  const openContext = useContext(Open);
  const setIsOpen = openContext.setIsOpen;

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
          icon={faBars}
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
