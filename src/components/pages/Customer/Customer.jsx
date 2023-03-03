import "./Customer.scss";
import "../../global/Layout/Layout";
import OrderPostItem from "./OrderPostItem/OrderPostItem";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import "../../global/Layout/Layout";
import { Layout } from "../../global/Layout/Layout";
import React, { useEffect } from "react";
import MyAddress from "./MyAddress/MyAddress";
import { useSelector, useDispatch } from "react-redux";
import { APIMyProfile } from "../../../api/axios/customerAPI";
import { userActions } from "../../../api/redux/slices/userSlice";

function Customer() {
  const dispatch = useDispatch();
  const listAddress = useSelector((state) => state.users.addresses);

  const loadUserInfo = async () => {
    console.log("calling api my profile");
    const resInfo = await APIMyProfile();
    if (resInfo.data) {
      const updateUserInfo = userActions.updateUserInfo({
        username: resInfo.data.username,
        name: resInfo.data.name,
        email: resInfo.data.email,
        phone: resInfo.data.phone,
        gender: resInfo.data.gender,
        dob: resInfo.data.dob,
        avatar: resInfo.data.avatar,
        addresses: resInfo.data.addressEntityList,
      });
      dispatch(updateUserInfo);
    }
  };

  useEffect(() => {
    document.title = "Thông tin người dùng";
    window.scrollTo(0, 0);

    if (listAddress.length <= 0) loadUserInfo();
  }, []);

  return (
    <div className="customer">
      <Layout>
        <CustomerInfo />
        <MyAddress loadUserInfo={loadUserInfo} listAddress={listAddress} />
        <OrderPostItem />
      </Layout>
    </div>
  );
}

export default Customer;
