import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const OneProduct = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // handle click cart
  const handleClickCart = () => {
    dispatch(addItemToCart(cartItems, props.data));
  };

  return (
    <div className="one-product">
      <div>
        <p>Name : {props.title}</p>

        <p>Description : {props.desc}</p>

        <p>Price : {props.price}$</p>

        <p>Discount : {props.discount}$</p>

        <p>About : {props.about}</p>

        <button onClick={handleClickCart} className="btn-submit">
          add to cart
        </button>
      </div>
      <div className="product-items-order">
        <img src={props.img} alt="product" />
      </div>
    </div>
  );
};

export default OneProduct;
