import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/loading";
import { USER } from "../../api/api";
import { Axios } from "../../axios/axios";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const Nav = useNavigate();

  // handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${USER}/add`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setLoading(false);
      Nav("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <h4 className="top-header">add user page</h4>

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="enter the name .."
              required
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
              placeholder="enter the email .."
              required
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
              placeholder="enter the password .."
              required
              minLength={8}
            />
          </div>
          <div>
            <label htmlFor="role">role</label>
            <select
              name="role"
              onChange={handleChange}
              value={form.role}
              id="role"
              required
            >
              <option value="" disabled>
                select role
              </option>
              <option value="1995">admin</option>
              <option value="2001">user</option>
              <option value="1999">product manger</option>
            </select>
          </div>
          <button
            className="btn-submit"
            disabled={
              form.name.length !== 0 &&
              form.email.length !== 0 &&
              form.role !== ""
                ? false
                : true
            }
          >
            create user
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
