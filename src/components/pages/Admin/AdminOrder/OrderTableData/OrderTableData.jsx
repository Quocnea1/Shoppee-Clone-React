import React from "react";
import "./OrderTableData.scss";
import OrderInfoDetail from "./OrderInfoDetail/OrderInfoDetail";
import { useSelector } from "react-redux";
function OrderTableData() {
  const allOrders = useSelector((state) => state.admin.allOrders);
  return (
    <div className="adminOrderTable">
      <div className="orderTable-heading">
        <p>Mã đơn hàng</p>
        <p>Ngày đặt</p>
        <p>Trạng thái</p>
        <p>Thông tin khách hàng</p>
        <p>Tổng tiền</p>
        <p>Thao tác</p>
      </div>
      <div className="orderTable">
        <div className="orderTable-info">
          {allOrders.orderEntityPage.length > 0 &&
            allOrders.orderEntityPage.map((_data, index) => (
              <OrderInfoDetail data={_data} key={index} dataDetail={allOrders.orderEntityDetail[index]} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrderTableData;
