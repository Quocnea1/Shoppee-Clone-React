import React from "react";
import "./RegisterWithThirdParty.scss";
const RegisterWithThirdParty = () => {
  return (
    <div className="thirdPartyButton">
      <a href="/" className="btn btn-primary facebook">
        {" "}
        <span>Facebook </span> <i className="fa fa-facebook"></i>{" "}
      </a>
      <a href="/" className="btn btn-primary google">
        Google <i className="fa fa-google-plus"></i>{" "}
      </a>
    </div>
  );
};

export default RegisterWithThirdParty;
