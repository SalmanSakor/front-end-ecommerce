import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/loading";
import StringSlice from "../../helpers/stringSlice";
import { cat } from "../../api/api";
import { Axios } from "../../axios/axios";

const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const Nav = useNavigate();
  const { id } = useParams();

  // get data input
  useEffect(() => {
    setLoading(true);
    Axios.get(`${cat}/${id}`)
      .then((data) => setTitle(StringSlice(data.data.title, 25)))
      .then(() => setLoading(false))
      .catch(() => Nav("/dashboard/categories/uu/404", { replace: true }));
  }, []);

  // handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("image", image);
      await Axios.post(`${cat}/edit/${id}`, form);
      setLoading(false);
      Nav("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <h4 className="top-header">update category</h4>

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="img">image</label>
            <input
              id="img"
              type="file"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </div>

          <button
            className="btn-submit"
            disabled={image !== "" && title !== "" ? false : true}
          >
            save
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCategory;
