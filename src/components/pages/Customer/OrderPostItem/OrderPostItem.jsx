import { useEffect, useState } from "react";
import { APIGetUserOrder } from "../../../../api/axios/orderAPI";
import OrderItem from "./OrderItem/OrderItem";
import "./OrderPostItem.scss";
import OrderSearchBar from "./OrderSearchBar/OrderSearchBar";

function OrderPostItem() {
  const [orderList, setOrderList] = useState({
    maxPage: 0,
    orderEntityDetail: [],
    orderEntityPage: [],
  });

  const loadUserOrder = async () => {
    console.log("calling api my order");
    const userId = window.sessionStorage.getItem("id");
    const resOrder = await APIGetUserOrder(userId);
    if (resOrder.status === 200) {
      setOrderList(resOrder.data);
    }
  };

  useEffect(() => {
    loadUserOrder();
  }, []);

  return (
    <div className="orderPostItem">
      <div className="container">
        <div className="wrapper">
          <OrderSearchBar />
          <div className="orderList">
            {orderList.orderEntityPage.length <= 0 ? (
              <div className="noOrder">
                <i className="fa-solid fa-bag-shopping"></i>
                Bạn chưa có đơn hàng nào :(
              </div>
            ) : (
              orderList.orderEntityPage.map((data, index) => (
                <OrderItem data={data} key={index} dataDetail={orderList.orderEntityDetail[index]} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPostItem;
