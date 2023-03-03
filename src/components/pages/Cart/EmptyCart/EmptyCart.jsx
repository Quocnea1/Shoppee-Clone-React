import "./EmptyCart.scss";
import emptyCart from "../../../../assets/images/cartEmpty.png";
import { useNavigate } from "react-router-dom";
function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="emptyCart">
      <div className="container">
        <img src={emptyCart} alt="" className="emptyCartImg" />
        <h2 className="emptyCartTitle">Giỏ hàng của bạn trống</h2>
        <button
          className="emptyCartBtn btn btn--primary"
          onClick={() => navigate("/collection")}
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
