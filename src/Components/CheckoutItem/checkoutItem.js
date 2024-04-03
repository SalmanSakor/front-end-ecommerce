import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CheckoutItem = ({ data }) => {
  const { title, rating, description, quantity, discount } = data;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, data));
  };
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, data));
  };
  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, data));
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{rating}</td>
      <td>{discount}$</td>
      <td>
        <div className="checkout-icons-flex">
          <FontAwesomeIcon
            icon={faMinus}
            cursor={"pointer"}
            color="#f53b57"
            onClick={removeItemHandler}
          />
          <div>{quantity}</div>
          <FontAwesomeIcon
            icon={faPlus}
            cursor={"pointer"}
            color="green"
            onClick={addItemHandler}
          />
        </div>
      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          cursor={"pointer"}
          color="#f53b57"
          onClick={clearItemHandler}
        />
      </td>
    </tr>
  );
};

export default CheckoutItem;
