import React from "react";
import Slider from "./../../pages/Home/HeroBanner/Slider/Slider";
import "./Banner.scss";

export default function Banner({ routeChange, data }) {
  const { normalPic } = data;

  return (
    <div
      id="carouselId"
      className="carousel slide leftBanner"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li data-target="#carouselId" data-slide-to={0} className="active" />
        <li data-target="#carouselId" data-slide-to={1} />
        <li data-target="#carouselId" data-slide-to={2} />
      </ol>
      <div onClick={routeChange} className="carousel-inner" role="listbox">
        {normalPic.map((_data, index) => (
          <Slider
            img={_data}
            key={index}
            firstSlide={index === 0 ? true : false}
          />
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselId"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselId"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
