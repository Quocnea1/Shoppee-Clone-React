import React from "react";
import "./AddressModal.scss";
const AddressModal = (props) => {
  const { onToggle, list, setCurrentAddressIndex } = props;

  const handleChangeAddress = (index) => {
    setCurrentAddressIndex(index)
    onToggle(false)
  }

  return (
    <div className="address-modal">
      <div className="modal">
        <div className="modalOverlay" onClick={() => onToggle(false)}></div>
        <div className="modalBody">
          {list.map((data, index) => (
            <div className="modalInner" key={index}>
              <div className="form-group row border-customer">
                <div className="col-md-8">
                  <label className="col-sm-4 col-form-label text-sm-right">
                    Họ và tên
                  </label>
                  <label className="col-sm-8 font-weight-bold">
                    {data.name}
                    {data.addressDefault &&
                    <span className="badge badge-info ml-4">Mặc định</span>
                  }
                  </label>
                  <label className="col-sm-4 col-form-label text-sm-right">
                    Số điện thoại
                  </label>
                  <label className="col-sm-8 font-weight-bold">{data.phoneNumber}</label>
                  <label className="col-sm-4 col-form-label text-sm-right">
                    Địa chỉ
                  </label>
                  <label className="col-sm-8 font-weight-bold">
                    {data.address}, {data.ward}, {data.district}, {data.city}
                  </label>
                </div>
                <div className="col-md-4">
                  <div className="text-center text-md-right">
                    <span className="text-underline text-secondary" onClick={() => handleChangeAddress(index)}>Chọn</span>
                  </div>
                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AddressModal;
