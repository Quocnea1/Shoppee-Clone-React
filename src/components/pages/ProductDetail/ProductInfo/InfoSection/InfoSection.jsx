import React, { useState } from "react";
import "./InfoSection.scss";
import ReactStars from "react-rating-stars-component";
import Type from "./Type/Type";
import Price from "./Price/Price";
import Quantity from "./Quantity/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "./../../../../../api/redux/slices/cartSlice";
import {
  APIAddToCart,
  APIGetAllCart,
} from "./../../../../../api/axios/cartAPI";
import MessageModal from "../../../../global/MessageModal/MessageModal";

export default function InfoSection({ data }) {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [number, setNumber] = useState(1);
  const [modal, setModal] = useState(false);

  const type = useSelector((state) => state.collection.currentProductType);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyNow = async () => {
    if (window.sessionStorage.getItem("jwt")) {
      if (number > 0) {
        const dataBuyNow = {
          productId: data.id,
          name: data.name,
          type: type[currentTypeIndex].type,
          price: data.price,
          quantity: number,
          totalPrice: data.price * number,
          image: data.imageProduct,
        };
        const buyNowAction = cartActions.buyNow(dataBuyNow);
        dispatch(buyNowAction);
        navigate("/checkout");
      } else {
        alert("Vui lòng chọn số lượng trước khi mua");
      }
    } else {
      navigate(`/login/${data.id}`);
    }
  };

  const handleAddToCart = async () => {
    if (window.sessionStorage.getItem("jwt")) {
      if (number > 0) {
        const dataToCart = {
          id: data.id,
          image: data.imageProduct,
          name: data.name,
          type: type[currentTypeIndex].type,
          price: data.price,
          quantity: number,
          totalPrice: data.price * number,
        };
        const resAddToCart = await APIAddToCart(
          dataToCart.id,
          dataToCart.quantity,
          dataToCart.type
        );
        if (resAddToCart.status === 200) {
          const resGetAllCart = await APIGetAllCart();
          if (resGetAllCart.status === 200) {
            const updateCartAction = cartActions.updateCartList(
              resGetAllCart.data
            );
            dispatch(updateCartAction);
            setModal(true)
          }
        } else {
          alert(`Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng`);
        }
      } else {
        alert("Vui lòng thêm số lượng sản phẩm!");
      }
    } else {
      navigate(`/login`, {
        state: {
          productId: data.id,
        },
      });
    }
  };

  return (
    <div className="InfoSection">
      {modal && <MessageModal message="Thêm vào giỏ hàng thành công" type="success" setModal={setModal} />}
      <div className="details">
        <h1 className="product-title">{data.name}</h1>
        <div className="rating">
          <div className="stars">
            <ReactStars
              count={5}
              size={20}
              color="#ebebeb"
              value={data.avgRating}
              edit={false}
              activeColor="#ee4d2d"
              classNames="star"
            />
          </div>
          <div className="reviews">
            <span className="review-no">Đánh Giá {data.avgRating}</span>
          </div>
          <div className="votes">{data.sold} Đã Bán</div>
        </div>
        <h3 className="price">
          {type &&
            type.map(
              (_data, index) =>
                currentTypeIndex === index && <Price data={_data} key={index} />
            )}
        </h3>
        <h6 className="types">
          Loại:
          {type &&
            type.map((_data, index) => (
              <Type
                index={index}
                data={_data}
                key={index}
                setCurrentTypeIndex={setCurrentTypeIndex}
                selected={index === currentTypeIndex}
              />
            ))}
        </h6>
        <div className="quantities">
          <h6 className="quantityTitle">Số lượng: </h6>
          {type &&
            type.map(
              (_data, index) =>
                currentTypeIndex === index && (
                  <span className="quantityInner" key={index}>
                    <Quantity
                      number={number}
                      setNumber={setNumber}
                      limit={_data.quantity}
                    />
                    <span className="inventory">
                      Còn {_data.quantity} sản phẩm
                    </span>
                  </span>
                )
            )}
        </div>
        <div className="action">
          <button
            onClick={() => handleAddToCart()}
            className="addToCart"
            type="button"
          >
            Thêm vào giỏ hàng
          </button>
          <button
            onClick={() => handleBuyNow()}
            className="buyNow"
            type="button"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
