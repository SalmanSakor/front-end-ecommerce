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
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectIsCartOpen,
  selectCartCount,
  selectCartItems,
} from "../../store/cart/cart.selector";
import { Link } from "react-router-dom";
import SkeletonShow from "../../Components/Skeleton/skeletonShow.js";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const counter = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);

  // handle click cart
  const handleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  // get products
  useEffect(() => {
    Axios.get(`${PRO}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // filter products
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const resultFilter =
    search.length > 0 &&
    filteredProducts.map((item, index) => (
      <div key={index} className="child-result-filter">
        <Link to={`/allProducts/${item.id}`}>{item.description}</Link>
      </div>
    ));

  // mapping cart items
  const cartItem = cartItems.map((item, index) => (
    <div key={index} className="cart-items-flex">
      <p>{item.title}</p>
      <p className="price-cart">{item.discount}$</p>
      <p className="quantity">{item.quantity}</p>
    </div>
  ));

  // render data
  return (
    <div className="landing-parent">
      <div className="landing-input-icon">
        <div></div>
        <div className="grand-result-filter">
          {loading ? (
            <SkeletonShow
              length={1}
              width="300px"
              height="40px"
              color="#b2bec3"
            />
          ) : (
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search product .."
              className="search-input"
            />
          )}
          <div className="parent-result-filter">
            {resultFilter}
            {filteredProducts.length === 0 && search.length > 0 && (
              <div child-result-filter>no result</div>
            )}
          </div>
        </div>
        <div className="parent-cart" onClick={handleIsCartOpen}>
          <FontAwesomeIcon icon={faCartShopping} className="icon-cart" />
          <div className="counter-cart">{counter}</div>
          <>
            {isCartOpen && counter > 0 ? (
              <div className="cart-items-child">
                <>
                  {cartItem}
                  <div className="btn-submit">
                    <Link to="/checkout">check out</Link>
                  </div>
                </>
              </div>
            ) : (
              isCartOpen &&
              counter === 0 && <div className="cart-items-child">no items</div>
            )}
          </>
        </div>
      </div>

      <div className="landing-product">
        <LatestSale />
        {loading ? (
          <SkeletonShow
            length={1}
            width="100%"
            height="400px"
            color="#dfe6e9"
          />
        ) : (
          <img src={img1} alt="img1" className="img-landing" />
        )}
      </div>

      <div className="landing-product">
        <TopRated />
        {loading ? (
          <SkeletonShow
            length={1}
            width="100%"
            height="400px"
            color="#dfe6e9"
          />
        ) : (
          <img src={img2} alt="img1" className="img-landing" />
        )}
      </div>

      <div className="landing-product">
        <LatestProduct />
        {loading ? (
          <SkeletonShow
            length={1}
            width="100%"
            height="400px"
            color="#dfe6e9"
          />
        ) : (
          <img src={img3} alt="img1" className="img-landing" />
        )}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
