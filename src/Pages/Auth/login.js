import axios from "axios";
import { useState } from "react";
import Loading from "../../Components/Loading/loading";
import Cookie from "cookie-universal";
import { LOGIN, baseurl } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const cookie = Cookie();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseurl}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });

      setLoading(false);

      const token = res.data.token;
      cookie.set("token", token);

      const role = res.data.user.role;
      const go =
        role === "1995" ? "users" : role === "1999" ? "products" : "test";
      window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("email or password is wrong");
      } else {
        setErr("internal server error");
      }
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <h4 className="top-header">login now</h4>
          <div>
            <label htmlFor="email">email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="enter your email .."
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="enter your password .."
              required
              minLength={8}
            />
          </div>
          {err !== "" && <div className="err-auth">{err}</div>}
          <button className="btn-submit">Login</button>
        </form>
        <div className="btn-google">
          <button className="btn-submit">
            <a
              href="http://127.0.0.1:8000/login-google"
              className="flex-btn-google"
            >
              <div style={{ textTransform: "lowercase" }}>
                login with google {""}
              </div>
              <FontAwesomeIcon icon={faGoogle} className="icon-google" />
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
