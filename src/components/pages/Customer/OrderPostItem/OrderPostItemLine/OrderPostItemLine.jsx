import "./OrderPostItemLine.scss";
import {
  ProcessLongText,
  TextToCurrency,
} from "../../../../global/ProcessText/ProcessText";
import React, { useState } from "react";
import RatingFormModal from "../RatingFormModal/RatingFormModal";

function OrderPostItemLine({ data, orderStatus }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="orderPostItemLine">
      <figure className="orderItemImg">
        <img src={data.productEntity.imageProduct} alt="San pham cua ban" />
      </figure>
      <h3 className="orderItemTitle">
        {<ProcessLongText string={data.productEntity.name} limit={30} />}
      </h3>
      <h3 className="orderItemType">Phân loại: {data?.type}</h3>
      <h3 className="orderItemQuantity">x{data?.quantity}</h3>
      <h3 className="orderItemPrice">
        {<TextToCurrency number={data?.unitPrice} />}
      </h3>
      {(orderStatus === "DONE") &&
      (
        <h3 className="orderItemRating" onClick={() => setModal(true)}>
          Đánh giá
        </h3>
      )}
      {modal && <RatingFormModal productId={data.productId} name={data.productEntity.name} setModal={setModal} />}
    </div>
  );
}

export default OrderPostItemLine;
