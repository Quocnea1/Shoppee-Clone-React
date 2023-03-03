import "./FullCart.scss";
import CartItem from "./CartItem/CartItem";
import React, { useEffect, useState } from "react";
import { TextToCurrency } from "../../../global/ProcessText/ProcessText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../api/redux/slices/cartSlice";

function FullCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.carts.list);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkList, setCheckList] = useState([]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i]) {
        total += cartList[i].totalPrice;
      }
    }
    return total;
  };

  const selectOne = (index) => {
    let temp = [...checkList];
    temp[index] = !checkList[index];
    setCheckList(temp);
  };

  const selectAll = (checked) => {
    setCheckedAll(!checkedAll);
    let temp = [...checkList];
    for (let i = 0; i < temp.length; i++) {
      temp[i] = checked ? true : false;
    }
    setCheckList(temp);
  };

  const goCheckOut = () => {
    let temp = [];
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i]) {
        temp.push(cartList[i]);
      }
    }
    if (temp.length > 0) {
      const toCheckoutAction = cartActions.updateCheckoutList(temp);
      dispatch(toCheckoutAction);
      navigate("/checkout");
    }
  };

  useEffect(() => {
    setCheckList(new Array(cartList.length).fill(false));
  }, [cartList]);

  return (
    <div className="container full-cart-table mt-5">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="label">
              <th className="border-0 text-secondary full-cart-col-product">
                Sản phẩm
              </th>
              <th className="border-0 text-secondary">Loại</th>
              <th className="border-0 text-center text-secondary">Đơn giá</th>
              <th className="border-0 text-center text-secondary">Số lượng</th>
              <th className="border-0 text-center text-secondary">
                Thành tiền
              </th>
              <th className="border-0 text-center text-secondary">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartList?.map((data, index) => (
              <CartItem
                data={data}
                key={index}
                index={index}
                selectOne={selectOne}
                checked={checkList[index] || false}
              />
            ))}
          </tbody>
          <tfoot className="tfoot">
            <tr>
              <td className="border-0 flex-center">
                <input
                  id="checkAll"
                  className="checkbox"
                  type="checkbox"
                  onChange={(event) => selectAll(event.target.checked)}
                  checked={checkedAll}
                />
                <label htmlFor="checkAll" className="ml-3 pe-auto">Chọn tất cả ({cartList.length})</label>
              </td>
              <td colSpan="1" className="border-0 font-weight-bold text-right">
                Tổng số tiền:
              </td>
              <td colSpan="5" className="border-0 h2 total-money">
                <span>
                  <TextToCurrency number={calculateTotalPrice()} />
                </span>
                <div
                  onClick={() => goCheckOut()}
                  className={`text-white btn btn-order ml-3 ${
                    !checkList.find((c) => c === true) && "noCheckout"
                  }`}
                >
                  Đặt hàng
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default FullCart;
