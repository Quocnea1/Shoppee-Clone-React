import "./MyAddress.scss";
import React, { useState, memo } from "react";
import AddressItem from "./AddressItem/AddressItem";
import AddressAdd from "./AddressAdd/AddressAdd";

const MyAddress = ({ loadUserInfo, listAddress }) => {
  const [modal, setModal] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  return (
    <div className="MyAddress">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h1 className="namehead">Địa Chỉ Của Tôi</h1>
            <h2 className="namehead2" onClick={() => setModal(true)}>
              <span className="btn1 btn btn--primary">+ Thêm Địa Chỉ Mới</span>
            </h2>
          </div>
          {listAddress.length <= 0 ? (
            <div className="noAddress">
              <figure className="addressFigure">
                <img
                  src="https://ibest.edu.vn/wp-content/uploads/2018/11/address.png"
                  alt="address"
                />
              </figure>
              Bạn chưa có địa chỉ nào
            </div>
          ) : (
            <div className="addressItem">
              {listAddress?.map((data, index) => (
                <AddressItem
                  loadUserInfo={loadUserInfo}
                  data={data}
                  setDataEdit={setDataEdit}
                  setModal={setModal}
                  key={index}
                />
              ))}
            </div>
          )}
          {modal && (
            <AddressAdd
              loadUserInfo={loadUserInfo}
              setModal={setModal}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MyAddress);
