import InfoField from "./InfoField/InfoField";
import "./CustomerInfo.scss";
import BannerInfo from "./BannerInfo/BannerInfo";

function CustomerInfo() {
  return (
    <div className="customerInfo">
      <div className="container">
        <BannerInfo />
        <div className="wrapper">
          <InfoField />
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
