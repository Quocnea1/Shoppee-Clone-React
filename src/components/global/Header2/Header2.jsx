import React from "react";
import { registerData } from "../../../utils/dataConfig";
import "./Header2.scss";
import { useNavigate } from "react-router-dom";

function Header2({title}) {
  const { logoShopeePrimary } = registerData.logo;
  const navigate = useNavigate();
  return (
    <div className="header2">
      <div className="container">
        <div className="wrapper">
          <figure className="logoShopee">
            <img
              src={logoShopeePrimary}
              alt="logoShopee"
              className="logoShopeeImg"
              onClick={() => {
                navigate("/");
              }}
            />
          </figure>
          <p className="title">{title}</p>
        </div>
        <a href="/help" className="helpAnchor">
          Bạn cần giúp đỡ
        </a>
      </div>
    </div>
  );
}

export default Header2;
