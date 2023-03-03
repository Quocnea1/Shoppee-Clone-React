import React from "react";
import "./BannerTop.scss";
import { Card } from "./Card/Card";
import Banner from "../../../global/Banner/Banner";
import { heroBannerData } from "./../../../../utils/dataConfig";

export default function BannerTop({ data }) {
  const { items } = data;
  return (
    <div className="bannerTop">
      <div className="container">
        <div className="wrapper">
          <Banner data={heroBannerData} />
          <div className="superSale">
            <div>
              <p className="title">{data.title}</p>
              <div className="allCard">
                {items.map((_data, index) => (
                  <Card data={_data} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
