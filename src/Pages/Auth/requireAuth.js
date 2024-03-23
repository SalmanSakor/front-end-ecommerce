import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/loading.js";
import { Axios } from "../../axios/axios.js";
import { USER } from "../../api/api.js";
import Page403 from "../403.js";

const RequireAuth = ({ allowedRole }) => {
  const [user, setUser] = useState("");
  const Nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("token");

  // get current user

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => Nav("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Page403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default RequireAuth;
