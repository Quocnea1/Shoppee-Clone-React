import React from "react";
import "./CheckoutInfo.scss";
function CheckoutInfo({ data }) {

  const processAddress = () => {
    return `${data.address}, ${data.ward}, ${data.district}, ${data.city}`;
  }
  return (
    <div className="checkout-info">
      <p>{data?.name}</p>
      <p>{data?.phoneNumber}</p>
      {data && <p>{processAddress()}</p>}
    </div>
  );
}

export default CheckoutInfo;
