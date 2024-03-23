import { useState, useEffect, useRef } from "react";
import Loading from "../../Components/Loading/loading";
import { Axios } from "../../axios/axios";
import { pro, CAT } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import StringSlice from "../../helpers/stringSlice";

const AddProduct = () => {
  const Nav = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const progress = useRef([]);
  const j = useRef(-1);
  const inputFile = useRef("");
  const ids = useRef([]);

  const [id, setId] = useState("");

  const dummyData = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };

  // get categories
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // handle change form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsOpen(false);
    if (isOpen) {
      handleSubmitDummyData();
    }
  };

  // handle click input file
  const handleClick = () => {
    inputFile.current.click();
  };

  // handle delete images
  const handleDeleteImages = async (item, index) => {
    const findId = ids.current[index];
    try {
      await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== item));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  };

  // handle submit dummy data
  const handleSubmitDummyData = async () => {
    try {
      const res = await Axios.post(`${pro}/add`, dummyData);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  // handle change images
  const handleChangeImages = async (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesFiles = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < imagesFiles.length; i++) {
      j.current++;
      formData.append("image", imagesFiles[i]);
      formData.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", formData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
              progress.current[j.current].style.backgroundColor = "#f53b57";
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  };

  // handle submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${pro}/edit/${id}`, form);
      setLoading(false);
      Nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("enter number in price or discount input");
      } else {
        setErr("internal server error");
      }
      console.log(err);
    }
  };

  // map images
  const imagesShow = images.map((item, index) => (
    <div key={index} className="parent-box-images">
      <img src={URL.createObjectURL(item)} alt="product" />
      <div className="items-box-images">
        <div className="header-btn" style={{ cursor: "default" }}>
          size : {""}
          {item.size / 1024 < 1000
            ? `${(item.size / 1024).toFixed(2)} KB`
            : `${(item.size / (1024 * 1204)).toFixed(1)} MB`}
        </div>
        <div
          onClick={() => handleDeleteImages(item, index)}
          className="header-btn"
        >
          delete
        </div>
      </div>
      <div className="custom-progress">
        <span
          className="inner-progress"
          ref={(e) => (progress.current[index] = e)}
        ></span>
      </div>
    </div>
  ));

  // map categories
  const result = categories.map((item, index) => (
    <option value={item.id} key={index}>
      {StringSlice(item.title, 30)}
    </option>
  ));

  return (
    <>
      {loading && <Loading />}
      <h4 className="top-header">add product page</h4>
      <div className="parent-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category">select category</label>
            <select
              id="category"
              value={form.category}
              onChange={handleChange}
              name="category"
              className="select-category"
              required
            >
              <option disabled>select category</option>
              {result}
            </select>
          </div>
          <div>
            <label htmlFor="title">title</label>
            <input
              id="title"
              type="text"
              placeholder="title .."
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={isOpen}
            />
          </div>
          <div>
            <label htmlFor="description">desc</label>
            <input
              id="description"
              type="text"
              placeholder="description .."
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              disabled={isOpen}
            />
          </div>
          <div className="flex-inputs">
            <div>
              <label htmlFor="price">price</label>
              <input
                id="price"
                type="text"
                placeholder="price .."
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                disabled={isOpen}
              />
            </div>
            <div>
              <label htmlFor="discount">discount</label>
              <input
                id="discount"
                type="text"
                placeholder="discount .."
                name="discount"
                value={form.discount}
                onChange={handleChange}
                required
                disabled={isOpen}
              />
            </div>
          </div>
          <div>
            <label htmlFor="about">about</label>
            <input
              id="about"
              type="text"
              placeholder="about .."
              name="About"
              value={form.About}
              onChange={handleChange}
              required
              disabled={isOpen}
            />
          </div>
          {err !== "" && <div className="err-auth">{err}</div>}
          <div>
            <div id="img">images</div>
            <input
              id="img"
              hidden
              ref={inputFile}
              multiple
              type="file"
              onChange={handleChangeImages}
              disabled={isOpen}
            />
          </div>
          <div
            onClick={handleClick}
            className={isOpen ? "category-close" : "category-open"}
          >
            <FontAwesomeIcon icon={faUpload} className="icon-upload" />
            <div style={{ textTransform: "lowercase" }}>upload images</div>
          </div>
          <div>{imagesShow}</div>
          <button className="btn-submit" disabled={isOpen}>
            add product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
