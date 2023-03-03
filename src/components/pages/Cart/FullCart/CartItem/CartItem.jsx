import "../FullCart.scss";
import QuantityCart from "../QuantityCart/QuantityCart";
import { TextToCurrency } from "../../../../global/ProcessText/ProcessText";
import React, { useState } from "react";
import { APIDeleteCart, APIUpdateCart } from "../../../../../api/axios/cartAPI";
import { cartActions } from "../../../../../api/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function CheckOutOrder({ data, index, selectOne, checked }) {

  const [quantity, setQuantity] = useState(data?.quantity);
  const dispatch = useDispatch();

  const changeQuantity = async (isUp) => {
    console.log("calling api update quantity");
    if (isUp) {
      const resUpdateCart = await APIUpdateCart(
        data?.productId,
        quantity + 1,
        data?.type
      );
      if(resUpdateCart.status === 200) {
        const updateCartQuantity = cartActions.updateCartQuantity(resUpdateCart.data);
        dispatch(updateCartQuantity)
      }
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      const resUpdateCart = await APIUpdateCart(
        data?.productId,
        quantity - 1,
        data?.type
      );
      if(resUpdateCart.status === 200) {
        const updateCartQuantity = cartActions.updateCartQuantity(resUpdateCart.data);
        dispatch(updateCartQuantity)
      }
      setQuantity(quantity - 1);
    }
  };

  const deleteCartItem = async () => {
    console.log("calling delete cart api");
    const resDeleteCart = await APIDeleteCart(data?.productId, data?.type)
    if(resDeleteCart.status === 200){
      window.location.reload()
    }
  }

  return (
    <tr className="cartItem">
      <td className="cartItemInfo">
        <input
          type="checkbox"
          name={"checkbox[" + data?.productId + "]"}
          className="mr-md-3 checkbox"
          onChange={() => selectOne(index)}
          checked={checked}
        />
        <img className="img-thumbnail" src={data?.image} alt="" />
        <div className="d-inline-block">
          <span className="ml-md-3 d-md-inline-block d-block">
            {data?.name}
          </span>
          <img
            src="https://cf.shopee.vn/file/78824b3edddb74e4669260ed8e8f471c"
            alt=""
            className="ml-md-3 d-block img-ads mt-3"
          />
        </div>
      </td>
      <td className="text-secondary align-middle">Phân loại: {data?.type}</td>
      <td className="align-middle text-center">
        <b><TextToCurrency number={data?.price} /></b>
      </td>
      <td className="font-weight-bold align-middle text-center">
        <QuantityCart quantity={quantity} changeQuantity={changeQuantity} />
      </td>
      <td className="align-middle text-center">
        <b><TextToCurrency number={data?.totalPrice} /></b>
      </td>
      <td className="font-weight-bold align-middle text-center" onClick={() => deleteCartItem()}>
        <span className="text-danger">Xoá</span>
      </td>
    </tr>
  );
}

export default CheckOutOrder;
