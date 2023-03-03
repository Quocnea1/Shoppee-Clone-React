import React from "react";
import "./HeroBanner.scss";
import { heroBannerData } from "../../../../utils/dataConfig";
import Banner from "../../../global/Banner/Banner";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const { abovePic, bottomPic } = heroBannerData;
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/news`;
    if (window.location.pathname === path) navigate(path, { replace: true });
    else navigate(path);
  };
  return (
    <div className="heroBanner">
      <div className="container">
        <div className="wrapper">
          <Banner routeChange={routeChange} data={heroBannerData} />
          <div className="rightBanner">
            <div className="abovePic">
              <img onClick={routeChange} src={abovePic} alt="banner" />
            </div>
            <div className="bottomPic">
              <img onClick={routeChange} src={bottomPic} alt="banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
