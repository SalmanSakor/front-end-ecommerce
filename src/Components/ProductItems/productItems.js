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
        <p>name : {props.title}</p>
        <p>description : {props.description}</p>
        <p>rating : {props.rating}/5</p>
        <div>price : {props.price}$</div>
        <div>discount : {props.discount}$</div>
        <div>about : {props.About}</div>
        <button onClick={handleClickCart}>add to cart</button>
      </div>
      <div>
        <img src={props.img} alt="product" />
      </div>
    </div>
  );
};

export default OneProduct;
