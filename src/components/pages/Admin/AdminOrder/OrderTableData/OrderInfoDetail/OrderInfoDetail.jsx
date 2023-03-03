import "./OrderInfoDetail.scss";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyModalComponent from "../../InforModal/InforModal";
import { TextToCurrency } from "../../../../../global/ProcessText/ProcessText";

function OrderInfoDetail({ data, dataDetail }) {
  const modalData = {
    title: "Thông Tin Đơn Hàng",
    body: [
      data.id,
      data.createdDate,
      formatingTiengViet(data.status).toUpperCase(),
      data.userName,
      TextToCurrency({ number: data.totalPrice }),
      data.phone,
    ],
  };
  const modalDataB = {
    title: "Thông Tin Đơn Hàng",
    body: [
      data.userId,
      data.address,
      data.payment,
      TextToCurrency({ number: data.shippingFee }),
      data.note,
    ],
  };
  const lowerData = {
    title: "Chi Tiết Đơn Hàng",
    body: dataDetail,
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openFromParent() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleAfterOpen() {}
  function formatingStatus(data) {
    if (data === "PENDING") {
      return "pending";
    } else if (data === "SHIPPING") {
      return "shipping";
    } else if (data === "DONE") {
      return "done";
    } else {
      return "else";
    }
  }
  function formatingTiengViet(data) {
    if (data === "PENDING") {
      return "Đang Chờ";
    } else if (data === "SHIPPING") {
      return "shipping";
    } else if (data === "DONE") {
      return "Hoàn Thành";
    } else if (data === "VNPAY_CONFIRM") return "Chờ thanh toán";
    else {
      return "Đã Hủy";
    }
  }
  const orderStatus = data.status;
  const orderId = data.id;
  return (
    <div className="order-info-table">
      <div className="order-info-name">{data.id}</div>
      <div className="order-info-time">{data.createdDate}</div>
      <div className={`order-info-status ${formatingStatus(data.status)}`}>
        {formatingTiengViet(data.status).toUpperCase()}
      </div>
      <div className="order-info-info">{data.userName}</div>
      <div className="order-info-amount">
        {<TextToCurrency number={data.totalPrice} />}
      </div>
      <button className="order-info-button" onClick={openFromParent}>
        Chi tiết
      </button>
      <MyModalComponent
        dynData={modalData}
        lowerData={lowerData}
        modalDataB={modalDataB}
        IsModalOpened={modalIsOpen}
        onCloseModal={handleCloseModal}
        onAfterOpen={handleAfterOpen}
        status={orderStatus}
        orderID={orderId}
      />
    </div>
  );
}

export default OrderInfoDetail;
