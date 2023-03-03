import React, { useEffect, useState } from "react";
import "./CheckOut.scss";
import CheckoutBanner from "./CheckoutBanner/CheckoutBanner";
import CheckoutChangeAddress from "./CheckoutChangeAddress/CheckoutChangeAddress";
import { Layout } from "../../global/Layout/Layout";
import CheckOutOrder from "./CheckOutOrder/CheckOutOrder";
import { TextToCurrency } from "../../global/ProcessText/ProcessText";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../api/redux/slices/userSlice";
import { APIMyProfile } from "../../../api/axios/customerAPI";
import AddressAdd from "../Customer/MyAddress/AddressAdd/AddressAdd";
import {
  APICreateOrderWithCOD,
  APICreateOrderWithVNPAY,
} from "../../../api/axios/orderAPI";
import { useNavigate } from "react-router-dom";
import CheckoutPayment from "./CheckoutPayment/CheckoutPayment";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutList = useSelector((state) => state.carts.checkoutList);
  const addressList = useSelector((state) => state.users.addresses);

  const getDefaultAddressIndex = () => {
    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].addressDefault) return i;
    }
    return 0;
  };

  const [currentAddressIndex, setCurrentAddressIndex] = useState(
    getDefaultAddressIndex()
  );
  const [noAddress, setNoAddress] = useState(false);
  const [payMethod, setPayMethod] = useState();

  const loadUserInfo = async () => {
    const resInfo = await APIMyProfile();
    if (resInfo.data) {
      const updateUserInfo = userActions.updateUserInfo({
        username: resInfo.data.username,
        name: resInfo.data.name,
        email: resInfo.data.email,
        phone: resInfo.data.phone,
        gender: resInfo.data.gender,
        dob: resInfo.data.dob,
        avatar: resInfo.data.avatar,
        addresses: resInfo.data.addressEntityList,
      });
      dispatch(updateUserInfo);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    checkoutList.forEach((item, i) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const formatAddress = () => {
    const addressItem = addressList[currentAddressIndex];
    return `${addressItem.address}, ${addressItem.ward}, ${addressItem.district}, ${addressItem.city}`;
  };

  const formatOrderItem = () => {
    let temp = [];
    for (let i = 0; i < checkoutList.length; i++) {
      temp.push({
        quantity: String(checkoutList[i].quantity),
        unit_price: String(checkoutList[i].price),
        product_id: String(checkoutList[i].productId),
        type: checkoutList[i].type,
      });
    }
    return temp;
  };

  const createOrderWithCOD = async () => {
    const resCreateOrder = await APICreateOrderWithCOD(
      formatOrderItem(),
      formatAddress(),
      addressList[currentAddressIndex].phoneNumber,
      addressList[currentAddressIndex].name
    );
    if (resCreateOrder.status === 200) {
      alert("Đặt hàng thành công");
      navigate("/customer");
    }
  };

  const createOrderWithVNPAY = async () => {
    const resCreateOrder = await APICreateOrderWithVNPAY(
      formatOrderItem(),
      formatAddress(),
      addressList[currentAddressIndex].phoneNumber,
      addressList[currentAddressIndex].name
    );
    console.log(resCreateOrder.data.url);
    window.open(resCreateOrder.data.url, "_self");
  };

  const createOrder = async () => {
    if (payMethod) {
      switch (payMethod) {
        case "VNPAY":
          await createOrderWithVNPAY();
          break;

        default:
          await createOrderWithCOD();
          break;
      }
    } else {
      alert("Vui lòng chọn phương thức thanh toán");
    }
  };

  useEffect(() => {
    if (addressList.length <= 0) setNoAddress(true);
    else setNoAddress(false);
  }, [addressList]);

  useEffect(() => {
    document.title = "Thanh toán";
    window.scrollTo(0, 0);

    loadUserInfo();
  }, []);

  return (
    <div className="checkout">
      <Layout>
        {noAddress && (
          <AddressAdd
            loadUserInfo={loadUserInfo}
            setModal={setNoAddress}
            message="thêm địa chỉ mới để đặt hàng"
          />
        )}
        <CheckoutBanner />
        <CheckoutChangeAddress
          list={addressList}
          currentAddressIndex={currentAddressIndex}
          setCurrentAddressIndex={setCurrentAddressIndex}
        />
        <CheckoutPayment method={payMethod} setMethod={setPayMethod} />
        <div className="container checkout-table">
          <table className="table">
            <thead>
              <tr>
                <th className="border-0 titleCart">Sản phẩm</th>
                <th className="border-0 titleCart"></th>
                <th className="border-0 text-center titleCart">Đơn giá</th>
                <th className="border-0 text-center titleCart">Số lượng</th>
                <th className="border-0 text-center titleCart">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {checkoutList.map((data, index) => (
                <CheckOutOrder data={data} key={Number(index)} />
              ))}
              <tr className="message">
                <td colSpan="4">
                  <label htmlFor="" className="font-weight-bold">
                    Lời nhắn:
                  </label>
                  <input
                    type="text"
                    className="form-control d-inline-block ml-5"
                    placeholder="Lưu ý người bán..."
                  />
                  <span className="shippingFee">
                    Giá vận chuyển: {<TextToCurrency number={25000} />}
                  </span>
                </td>
              </tr>
              <tr></tr>
            </tbody>
            <tfoot>
              <tr colSpan="10" className="font-weight-bold text-right">
                <td className="border-0 font-weight-bold text-right">
                  Tổng số tiền:
                </td>
                <td className="border-0 text-right h2 total-money moreMargin">
                  <TextToCurrency number={calculateTotal()} />
                </td>
                <td colSpan="3">
                  <button
                    className="text-white btn btn-order mr-5"
                    onClick={() => createOrder()}
                  >
                    Thanh toán
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Layout>
    </div>
  );
}

export default CheckOut;
