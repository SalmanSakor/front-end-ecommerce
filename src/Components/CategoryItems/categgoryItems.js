import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { Link } from "react-router-dom";

const OneCategory = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const round = Math.round(props.rating);
  const starts = Math.round(round, 5);
  const solidStars = Array.from({ length: starts }).map((_, index) => (
    <FontAwesomeIcon
      icon={solid}
      key={index}
      color="gold"
      className="icon-star"
    />
  ));
  const regularStars = Array.from({ length: 5 - starts }).map((_, index) => (
    <FontAwesomeIcon
      icon={regularStar}
      key={index}
      color="#b2bec3"
      className="icon-star"
    />
  ));

  // handle click cart
  const handleClickCart = () => {
    dispatch(addItemToCart(cartItems, props.data));
  };

  return (
    <div className="card-product">
      <p className="btn-submit">
        <Link to={`/allProducts/${props.id}`}>{props.title}</Link>
      </p>

      <div className="cart-product-items">
        <img src={props.img} alt="product" />
      </div>

      <div>
        {solidStars}
        {regularStars}
      </div>
      <div className="product-price-discount">
        <div className="product-discount">{props.discount}$</div>
        <div>
          <del>{props.price}$</del>
        </div>
      </div>

      <button className="btn-submit" onClick={handleClickCart}>
        add to cart
      </button>
    </div>
  );
};

export default OneCategory;
