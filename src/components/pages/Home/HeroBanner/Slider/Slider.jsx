import React from "react";
import './Slider.scss'

export default function Slider({ img, firstSlide }) {
  return (
    <div
      className={firstSlide === true ? "carousel-item active" : "carousel-item"}
    >
      <img src={img} alt="First slide" />
    </div>
  );
}
