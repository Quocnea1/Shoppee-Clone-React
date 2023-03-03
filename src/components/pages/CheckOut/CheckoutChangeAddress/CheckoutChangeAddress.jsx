import React from "react";
import AddressModal from "./AddressModal/AddressModal";
import "./CheckoutChangeAddress.scss";
import CheckoutInfo from "./CheckoutInfo/CheckoutInfo";
import { useSelector } from "react-redux";
import { APIMyProfile } from "../../../../api/axios/customerAPI";
import { userActions } from "../../../../api/redux/slices/userSlice";
import { useDispatch } from "react-redux";

function CheckoutChangeAddress({list, currentAddressIndex, setCurrentAddressIndex}) {
  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <React.Fragment>
      <div className="checkout-change">
        <div className="container">
          <div className="checkout-titles">
            <i className="fa-solid fa-location-dot"></i>
            <b> Địa chỉ nhận hàng</b>
          </div>
          <div className="checkout-data">
            {list && <CheckoutInfo data={list[currentAddressIndex]} />}
            <button className="btn-change" onClick={setToggle}>
              <b>THAY ĐỔI</b>
            </button>
          </div>
        </div>
      </div>
      {toggle && (
        <AddressModal
          setCurrentAddressIndex={setCurrentAddressIndex}
          list={list}
          onToggle={handleToggle}
        />
      )}
    </React.Fragment>
  );
}

export default CheckoutChangeAddress;
