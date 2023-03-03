import React from "react";
import "./OrderItem.scss";
import { TextToCurrency } from "../../../../global/ProcessText/ProcessText";
import OrderPostItemLine from "../OrderPostItemLine/OrderPostItemLine";

export default function OrderItem({ data, dataDetail }) {
  const handleOrderStatusDot = (status) => {
    if (status === "DONE") {
      return "colorConfirmed";
    } else if (status === "PENDING") {
      return "colorPending";
    } else if (status === "VNPAY_CONFIRM") return "colorPendingVNPAY";
    else return "colorCancelled";
  };
  const handleOrderStatus = (status) => {
    if (status === "DONE") {
      return "Đã xác nhận";
    } else if (status === "PENDING") {
      return "Chờ xác nhận";
    } else if (status === "VNPAY_CONFIRM") return "Chờ thanh toán";
    else return "Đã hủy";
  };

  return (
    <div className="orderItem">
      {dataDetail.length > 0 &&
        dataDetail.map((_data, index) => (
          <OrderPostItemLine
            data={_data}
            key={index}
            orderStatus={data.status}
          />
        ))}
      <div className="orderInfo">
        <div className="addressDelivery">{`Địa chỉ: ${data.address}`}</div>
        <div className="addressDelivery">{data.createdDate}</div>
        <div className="phoneDelivery">Số điện thoại: {data.phone}</div>
        <div className={`statusOrder ${handleOrderStatusDot(data.status)}`}>
          <i className="fa-solid fa-circle icon"></i>
          {handleOrderStatus(data.status)}
        </div>
        <div className="totalPrice">
          Tổng số tiền:
          <span>
            <TextToCurrency number={data.totalPrice} />
          </span>
        </div>
      </div>
    </div>
  );
}
