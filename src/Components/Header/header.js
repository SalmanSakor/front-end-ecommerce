import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cookie from "cookie-universal";
import { LOGOUT } from "../../api/api";
import { Axios } from "../../axios/axios";
import { CAT } from "../../api/api";
import StringSlice from "../../helpers/stringSlice";
import SkeletonShow from "../Skeleton/skeletonShow";
import { Width } from "./../../Context/width";
import { Menu } from "../../Context/menu";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectIsCartOpen,
  selectCartCount,
  selectCartItems,
} from "../../store/cart/cart.selector";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const counter = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const cookie = Cookie();
  const token = cookie.get("token");

  // widthContext
  const widthContext = useContext(Width);
  const windowSize = widthContext.windowWidth;

  // menuContext
  const menuContext = useContext(Menu);
  const setOpenMenu = menuContext.setIsOpen;
  const isOpenMenu = menuContext.isOpen;

  //handle click menu
  const handleClickIcon = () => {
    setOpenMenu((prev) => !prev);
  };

  // handle click cart
  const handleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  //handle logout
  const logoutHandler = async () => {
    try {
      await Axios.get(`${LOGOUT}`);
      cookie.remove("token");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  // get all categories
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // mapping categories
  const navbar = categories.map((item, index) => (
    <p key={index} className="header-btn">
      {item.title}
    </p>
  ));

  // menu
  const menu = windowSize <= 768 && (
    <div>
      {categories.map((item, index) => (
        <p key={index} style={{ cursor: "pointer" }}>
          {item.title}
        </p>
      ))}
      <p onClick={handleClickIcon}>
        <Link to="/allCategories">all categories</Link>
      </p>
      <p onClick={handleClickIcon}>
        <Link to="/">home page</Link>
      </p>
    </div>
  );
  // mapping cart items
  const cartItem = cartItems.map((item, index) => (
    <div key={index} className="flex-cart-items">
      <p>{StringSlice(item.title, 4)}</p>
      <p>{item.discount}$</p>
      <p className="quantity">{item.quantity}</p>
    </div>
  ));

  return (
    <>
      {/* 1 */}
      <div className="header-flex-out">
        <NavLink
          to="/"
          className="header-btn"
          style={{ display: windowSize <= 768 && "none" }}
        >
          Home
        </NavLink>
        <div className="parent-menu">
          {windowSize <= 768 && (
            <FontAwesomeIcon
              icon={isOpenMenu ? faBars : faXmark}
              className="icon-header"
              onClick={handleClickIcon}
            />
          )}
          {!isOpenMenu && (
            <div
              className="menu"
              style={{ display: windowSize > 768 && "none" }}
            >
              {menu}
            </div>
          )}
        </div>

        <div className="header-flex-in">
          {token ? (
            <NavLink to="/dashboard/products" className="header-btn">
              Dashboard
            </NavLink>
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

          {token && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={logoutHandler}
              className="icon-header"
            />
          )}
        </div>
      </div>
      {/* 2 */}
      <div
        className="navbar-flex"
        style={{ display: windowSize <= 768 && "none" }}
      >
        {navbar}
        <NavLink to="/allCategories" className="header-btn">
          all categories
        </NavLink>
      </div>
    </>
  );
};
export default Header;
