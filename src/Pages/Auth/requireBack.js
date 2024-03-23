import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

const RequireBack = () => {
  const cookie = Cookie();
  const token = cookie.get("token");
  return token ? window.history.back() : <Outlet />;
};
export default RequireBack;
