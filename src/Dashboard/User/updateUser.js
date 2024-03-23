import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/loading";
import { USER } from "../../api/api";
import { Axios } from "../../axios/axios";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const Nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
      })
      .then(() => setLoading(false))
      .then(() => setDisabled(false))
      .catch(() => Nav("/dashboard/users/uu/404", { replace: true }));
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
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
      <h4 className="top-header">update user</h4>

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="enter the name .."
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter the email .."
              required
            />
          </div>
          <div>
            <label htmlFor="role">role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              id="role"
              required
            >
              <option value="" disabled>
                select the role
              </option>
              <option value="1995">admin</option>
              <option value="2001">user</option>
              <option value="1999">product manger</option>
            </select>
          </div>
          <button className="btn-submit" disabled={disabled}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
