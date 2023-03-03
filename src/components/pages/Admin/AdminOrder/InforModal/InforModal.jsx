import React from "react";
import Modal from "react-modal";
import "./InforModal.scss";
import "react-dropdown/style.css";
import { TextToCurrency } from "../../../../global/ProcessText/ProcessText";
import { APICancelOrder, APIConfirmOrder, APIUpdateOrder } from "../../../../../api/axios/orderAPI";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "500px",
  },
};

function MyModalComponent(props) {
  function afterOpenModal(e) {
    props.onAfterOpen(e, "After Modal Opened");
  }
  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    props.onCloseModal(event, data);
  }

  const updateOrderStatus = async (orderID, status) => {
    const res = await APIUpdateOrder((orderID = props.orderID), status);
    console.log(res);
    if (res.status === 200) {
      if (alert(`${status === "DONE" ? "Nhận đơn" : "Hủy Đơn"} thành công!`)) {
      } else window.location.reload();
    }
  };

  const confirmOrder = async () => {
    console.log("calling confirm order api");
    const resConfirmOrder = await APIConfirmOrder(props.orderID);
    if(resConfirmOrder.status === 200){
      if (alert("Nhận đơn thành công!")) {
      } else window.location.reload();
    }
  }

  const cancelOrder = async () => {
    console.log("calling cancel order api");
    const resCancelOrder = await APICancelOrder(props.orderID);
    if(resCancelOrder.status === 200){
      if (alert("Hủy đơn thành công!")) {
      } else window.location.reload();
    }
  }

  function handleChangeConfirm() {
    updateOrderStatus(props.orderID, "DONE");
  }
  function handleChangeCancel() {
    updateOrderStatus(props.orderID, "CANCELED");
  }

  function formatingStatus(data) {
    if (data === "ĐANG CHỜ") {
      return "pending";
    } else if (data === "ĐÃ HỦY") {
      return "cancelled";
    } else if (data === "HOÀN THÀNH") {
      return "done";
    } else {
      return "else";
    }
  }

  function formatingButton(data) {
    if (data === "DONE" || data === "CANCELED") {
      return "btn-hide";
    } else return "";
  }

  const titleH = [
    "Mã đơn hàng",
    "Ngày đặt",
    "Trạng thái",
    "Thông tin khách hàng",
    "Tổng giá",
    "Phone",
  ];
  const titleL = [
    "Mã khách hàng",
    "Địa chỉ nhận hàng",
    "Phương thức thanh toán",
    "Phí vận chuyển",
    "Ghi chú",
  ];

  return (
    <div>
      <Modal
        isOpen={props.IsModalOpened}
        onAfterOpen={(e) => afterOpenModal(e)}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={onModalClose}
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="modal-title">{props.dynData.title}</h2>
        <div
          style={{
            backgroundColor: "gray",
            opacity: "30%",
            height: "2px",
            margin: "20px",
          }}
        ></div>
        <div style={{ display: "flow-root" }}>
          <div style={{ display: "flex" }}>
            <ul>
              {titleH.map((data, index) => (
                <h5
                  className="data-in-modal"
                  style={{ color: "gray" }}
                  key={index}
                >
                  {data}
                </h5>
              ))}
            </ul>
            <ul>
              {props.dynData.body.map((data, index) => (
                <h5
                  className={`data-in-modal ${formatingStatus(data)}`}
                  key={index}
                >{` ${data}`}</h5>
              ))}
            </ul>
            <ul>
              {titleL.map((data, index) => (
                <h5
                  className="data-in-modal"
                  style={{ color: "gray" }}
                  key={index}
                >
                  {data}
                </h5>
              ))}
            </ul>
            <ul>
              {props.modalDataB.body.map((data, index) => (
                <h5 className="data-in-modal" key={index}>{` ${data}`}</h5>
              ))}
            </ul>
          </div>
          <button onClick={(e) => onModalClose(e)} className="btn-style">
            Đóng
          </button>
          <button
            onClick={() => cancelOrder()}
            className={`btn-style cancel ${formatingButton(props.status)}`}
            disabled={props.status === "CANCELED" || props.status === "DONE"}
            style={{ float: "right" }}
          >
            Huỷ Đơn
          </button>
          <button
            onClick={() => confirmOrder()}
            className={`btn-style confirm ${formatingButton(props.status)}`}
            disabled={props.status === "CANCELED" || props.status === "DONE"}
            style={{ float: "right", borderColor: "#00e600" }}
          >
            Nhận Đơn
          </button>
        </div>
        <div
          style={{
            backgroundColor: "gray",
            opacity: "30%",
            height: "2px",
            margin: "20px",
          }}
        ></div>
        <h2 className="modal-title">{props.lowerData.title}</h2>
        <div>
          <ul>
            {props.lowerData.body.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  backgroundColor: "#eeeeee",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "10px",
                  alignItems: "center",
                }}
              >
                <img
                  className="img-details"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: " 0 10px",
                  }}
                  src={data.productEntity.imageProduct}
                  alt="src"
                />
                <div style={{ display: "block" }}>
                  <h5 className="data-in-modal">
                    {`Tên Sản Phẩm: ${data.productEntity.name}`}
                  </h5>{" "}
                  <h5 className={"data-in-modal"}>
                    {`Tình trạng: ${data.productEntity.status}`}
                  </h5>{" "}
                  <h5 className="data-in-modal">{`Số Lượng: ${data.quantity}`}</h5>{" "}
                  <h5 className="data-in-modal">
                    {`Đơn Giá : ${TextToCurrency({
                      number: data.unitPrice,
                    })}`}
                  </h5>{" "}
                  <h5 className="data-in-modal">{`Phân Loại: ${data.type}`}</h5>{" "}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div
          style={{
            backgroundColor: "gray",
            opacity: "30%",
            height: "2px",
            margin: "20px",
          }}
        ></div>
      </Modal>
    </div>
  );
}

export default MyModalComponent;
