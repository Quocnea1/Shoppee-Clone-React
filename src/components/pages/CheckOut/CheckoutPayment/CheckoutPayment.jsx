import React from "react";
import "./CheckoutPayment.scss";

export default function CheckoutPayment({ method, setMethod }) {
  const methodChange = (e) => {
    switch (e.target.id) {
      case "COD":
        setMethod("COD");
        break;
      case "VNPAY":
        setMethod("VNPAY");
        break;
      default:
        break;
    }
  };

  return (
    <div className="CheckoutPayment">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <i className="fa-solid fa-credit-card"></i>
            Phương thức thanh toán
          </div>
          <div className="paymentContent">
            <div className="paymentField">
              <input
                type="radio"
                id="COD"
                name="payMethod"
                className="input"
                value="COD"
                onClick={(e) => methodChange(e)}
              />
              <label
                htmlFor="COD"
                className={`label ${method === "COD" ? "checked" : ""}`}
              >
                Trả tiền khi nhận hàng
              </label>
            </div>
            <div className="paymentField">
              <input
                type="radio"
                id="VNPAY"
                name="payMethod"
                className="input"
                value="VNPAY"
                onClick={(e) => methodChange(e)}
              />
              <label
                htmlFor="VNPAY"
                className={`label ${method === "VNPAY" ? "checked" : ""}`}
              >
                VNPAY
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
