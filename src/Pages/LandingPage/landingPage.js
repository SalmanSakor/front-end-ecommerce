import LatestSale from "../../Components/Product/latestSale.js";
import LatestProduct from "../../Components/Product/latestProduct.js";
import TopRated from "../../Components/Product/topRated.js";
import Footer from "../../Components/Footer/Footer.js";
import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios.js";
import { PRO } from "../../api/api";

import img1 from "../../Assets/img1.jpg";
import img2 from "../../Assets/img2.jpg";
import img3 from "../../Assets/img3.jpg";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // get products

  useEffect(() => {
    Axios.get(`${PRO}`)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // mapping filtered products
  const result =
    search.length >= 1 &&
    search.trim() &&
    filteredProducts.map((item, index) => (
      <div style={{ cursor: "pointer" }} key={index}>
        {item.title}
      </div>
    ));

  return (
    <div className="landing-parent">
      <div className="landing-search-input">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search product .."
          className="search-input"
        />
        {result}
      </div>

      <div className="landing-product">
        <LatestSale />
        <img src={img1} alt="img1" className="img-landing" />
      </div>

      <div className="landing-product">
        <TopRated />
        <img src={img2} alt="img1" className="img-landing" />
      </div>

      <div className="landing-product">
        <LatestProduct />
        <img src={img3} alt="img1" className="img-landing" />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
