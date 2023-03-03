import React, { useState } from "react";
import "./QuantityCart.scss";

export default function QuantityCart({ quantity, changeQuantity }) {

  return (
    <div className="quantityCart">
      <div className="counter">
        <span onClick={() => changeQuantity(false)} className="down">
          -
        </span>
        <span className="number">{quantity}</span>
        <span onClick={() => changeQuantity(true)} className="up">
          +
        </span>
      </div>
    </div>
  );
}
