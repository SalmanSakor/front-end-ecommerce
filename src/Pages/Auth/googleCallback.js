import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseurl, GOOGLE_CAll_BACK } from "../../api/api";

const GoogleCallback = () => {
  const location = useLocation();
  const cookie = Cookie();
  useEffect(() => {
    const GoogleCall = async () => {
      try {
        const res = await axios.get(
          `${baseurl}/${GOOGLE_CAll_BACK}${location.search}`
        );
        const token = res.data.access_token;
        console.log(token);
        cookie.set("token", token);
      } catch (err) {
        console.log(err);
      }
    };
    GoogleCall();
  }, []);

  return <Navigate to={"/"} />;
};

export default GoogleCallback;
