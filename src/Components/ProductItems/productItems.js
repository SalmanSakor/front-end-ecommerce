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
        <hr />
        <p>Description : {props.desc}</p>
        <hr />
        <p>Rating : {props.rating}/5</p>
        <hr />
        <div>Price : {props.price}$</div>
        <hr />
        <div>Discount : {props.discount}$</div>
        <hr />
        <div>About : {props.about}</div>
        <hr />

        <button onClick={handleClickCart} className="btn-submit">
          add to cart
        </button>
      </div>
      <div>
        <img src={props.img} alt="product" />
      </div>
    </div>
  );
};

export default OneProduct;
