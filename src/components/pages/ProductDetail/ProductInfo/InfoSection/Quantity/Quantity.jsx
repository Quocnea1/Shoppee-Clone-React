import React from "react";
import "./Quantity.scss";

export default function Quantity({ borderR = 0, limit = 99999, setNumber, number }) {

  const handleChange = (isUp) => {
    if (isUp && number < limit) {
      setNumber(number + 1);
    } else if (!isUp && number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <div className="quantity">
      <div className="counter" style={{ borderRadius: borderR + "px" }}>
        <span onClick={() => handleChange(false)} className="down">
          -
        </span>
        <span className="number">{number}</span>
        <span onClick={() => handleChange(true)} className="up">
          +
        </span>
      </div>
    </div>
  );
}
