import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../Components/CheckoutItem/checkoutItem";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <>
      {cartItems.length !== 0 ? (
        <>
          <div className="parent-checkout">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>rating</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <CheckoutItem data={item} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="btn-checkout">
            <div className="btn-submit">Total : {total}$</div>
          </div>
        </>
      ) : (
        <div className="btn-checkout">
          <div className="btn-submit">cart is empty</div>
        </div>
      )}
    </>
  );
};

export default Checkout;
