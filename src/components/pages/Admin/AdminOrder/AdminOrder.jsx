import React, { useEffect } from "react";
import OrderTableData from "./OrderTableData/OrderTableData";
import "./AdminOrder.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIGetAllOrder } from "../../../../api/axios/orderAPI";
import { adminActions } from "../../../../api/redux/slices/adminSlice";

export default function AdminOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.admin.allOrders.orderEntityPage);

  const loadData = async () => {
    console.log("calling admin api order");
    const resAllOrder = await APIGetAllOrder();
    if(resAllOrder.status === 200){
      const orderAction = adminActions.updateOrder(
        resAllOrder.data
      );
      dispatch(orderAction);
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("role") === "ROLE_ADMIN") {
      if (orderList.length <= 0) loadData();
    } else if (window.sessionStorage.getItem("role") === "ROLE_USER")
      navigate("/");
    else navigate("/login");
  }, []);

  return (
    <div className="adminOrder">
      <div className="adminContainer">
        <OrderTableData />
      </div>
    </div>
  );
}
