import React, { useEffect } from "react";
import "./PaymentNotification.scss";
import { Header } from "../../global/Header/Header";
import { Footer } from "../../global/Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { APICheckoutUpdateOrder } from "../../../api/axios/orderAPI";

export default function PaymentNotification() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const responseCode = searchParams.get("vnp_ResponseCode");
  const orderId = searchParams.get("vnp_TxnRef");

  const UpdateOrder = async () => {
    const resCheckoutUpdateOrder = await APICheckoutUpdateOrder(orderId, responseCode === "00" ? "DONE" : "CANCELED")
    console.log(resCheckoutUpdateOrder);
  };

  useEffect(() => {
    UpdateOrder();
  }, [orderId]);

  return (
    <div className="paymentNotification">
      <Header />
      <div className="content">
        {responseCode === "00" ? (
          <i className="fa-solid fa-circle-check success"></i>
        ) : (
          <i className="fa-solid fa-circle-exclamation failed"></i>
        )}
        <span className={responseCode === "00" ? "success" : "failed"}>
          {responseCode === "00"
            ? "Thanh toán thành công"
            : "Thanh toán thất bại"}
        </span>
        <div className="btn toHome" onClick={() => navigate("/")}>
          Trang chủ
        </div>
      </div>
      <Footer />
    </div>
  );
}
