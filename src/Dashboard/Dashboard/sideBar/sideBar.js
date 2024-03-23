import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER } from "../../../api/api";
import { Axios } from "../../../axios/axios";
import { Data } from "./sideLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Open } from "../../../Context/isOpen";

const SideBar = () => {
  const [role, setRole] = useState("");

  // context
  const openContext = useContext(Open);
  const isOpen = openContext.isOpen;

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setRole(data.data.role))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="nav-side-parent">
      {Data.map(
        (item, index) =>
          item.role.includes(role) && (
            <NavLink
              to={item.path}
              key={index}
              className={isOpen ? "nav-side-open" : "nav-side-close"}
            >
              <FontAwesomeIcon icon={item.icon} className="icon-sideBar" />
              <div style={{ display: isOpen ? "block" : "none" }}>
                {item.name}
              </div>
            </NavLink>
          )
      )}
    </div>
  );
};

export default SideBar;
