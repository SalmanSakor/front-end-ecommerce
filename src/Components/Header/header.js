import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBasketShopping,
  faHome,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Cookie from "cookie-universal";
import { LOGOUT } from "../../api/api";
import { Axios } from "../../axios/axios";
import { CAT } from "../../api/api";
import StringSlice from "../../helpers/stringSlice";
import SkeletonShow from "../Skeleton/skeletonShow";
import { Width } from "./../../Context/width";
import { Layout } from "../../Context/layout";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();
  const token = cookie.get("token");

  // widthContext
  const widthContext = useContext(Width);
  const widthWindow = widthContext.windowWidth;

  // layoutContext
  const layoutContext = useContext(Layout);
  const setLayoutOpen = layoutContext.setLayoutOpen;
  const OpenLayout = layoutContext.layoutOpen;

  //handle click
  const handleClickIcon = async () => {
    setLayoutOpen((prev) => !prev);
  };

  //handle logout
  const handleClick = async () => {
    try {
      await Axios.get(`${LOGOUT}`);
      cookie.remove("token");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  // all categories
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.slice(-5)))
      .finally(() => setLoading(false));
  }, []);

  const result1 = categories.map((item, index) => (
    <div key={index}>
      <p className="header-btn">{StringSlice(item.title, 5)}</p>
    </div>
  ));
  const result2 = categories.map((item, index) => (
    <div key={index}>
      <p style={{ cursor: "pointer" }}>{StringSlice(item.title, 10)}</p>
      <hr style={{ marginBottom: "5px" }} />
    </div>
  ));

  return (
    <div className="grand-header">
      <>
        {widthWindow <= 768 && !OpenLayout && (
          <div className="layout-header">
            <div>{result2}</div>
            <NavLink to="/allCategories">
              all categories <hr style={{ marginBottom: "5px" }} />
            </NavLink>
          </div>
        )}
      </>

      <div className="header-parent">
        <div className="header-flex-space">
          {widthWindow <= 768 && (
            <FontAwesomeIcon
              icon={faBars}
              className="icon-header"
              onClick={handleClickIcon}
            />
          )}
          {widthWindow > 768 && (
            <NavLink to="/" className="header-btn">
              Home
            </NavLink>
          )}
          <div className="header-flex-space1">
            {token ? (
              <div className="header-flex-space1">
                <NavLink to="/dashboard/products" className="header-btn">
                  Dashboard
                </NavLink>

                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  onClick={handleClick}
                  className="icon-header"
                />
              </div>
            ) : (
              <>
                <NavLink to="/login" className="header-btn">
                  Login
                </NavLink>
                <NavLink to="/register" className="header-btn">
                  Register
                </NavLink>
              </>
            )}
            {widthWindow <= 768 && (
              <>
                <FontAwesomeIcon
                  icon={faBasketShopping}
                  className="icon-header"
                />
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} className="icon-header" />
                </Link>
              </>
            )}
          </div>
        </div>

        <div
          className="header-flex-space"
          style={{
            display: widthWindow <= 768 && "none",
          }}
        >
          <div className="header-flex-start">
            {loading ? (
              <SkeletonShow
                length={5}
                width="75px"
                height="35px"
                color="#dfe6e9"
              />
            ) : (
              <div
                className="header-flex-space2"
                style={{ textTransform: "lowercase" }}
              >
                {result1}
                <NavLink to="/allCategories" className="header-btn">
                  all categories
                </NavLink>
              </div>
            )}
          </div>
          <div>
            <FontAwesomeIcon icon={faBasketShopping} className="icon-header" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
