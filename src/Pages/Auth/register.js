import axios from "axios";
import { useState } from "react";
import Cookie from "cookie-universal";
import Loading from "../../Components/Loading/loading";
import { baseurl, REGISTER } from "../../api/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();

  // handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseurl}/${REGISTER}`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      console.log(res);
      const token = res.data.token;
      cookie.set("token", token);

      window.location.pathname = "/";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("email is already been taken");
      } else {
        setErr("internal server error");
      }
      console.log(err);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <h4 className="top-header">register now</h4>
          <div>
            <label htmlFor="name">name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="enter your name .."
              required
              autoFocus
            />
          </div>
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
            />
          </div>
          {err !== "" && <div className="err-auth">{err}</div>}

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

          <button className="btn-submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
