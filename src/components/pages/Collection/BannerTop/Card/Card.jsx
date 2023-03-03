import React from "react";
import "./Card.scss";

export const Card = ({ data }) => {
  return (
    <div className="card" style={{ width: "19rem" }}>
      <img className="card-img-top" src={data.img} alt="banner" />
      <div className="card-body">
        <p className="card-text text-center cardTitle">{data.title}</p>
        <p className="card-text text-center">
          <span className="cardFrom">Từ</span>
          <span className="cardPrice">{data.price}</span>
        </p>
      </div>
    </div>
  );
};
