import { useState } from "react";
import Loading from "../../Components/Loading/loading";
import { Axios } from "../../axios/axios";
import { cat } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${cat}/add`, form);
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
      <h4 className="top-header">add category page</h4>

      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">title</label>
            <input
              id="title"
              type="text"
              placeholder="enter the title .."
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
            add category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
