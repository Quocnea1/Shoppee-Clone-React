import {
  APIDeleteAddress,
  APISetDefaultAddress,
} from "../../../../../api/axios/customerAPI";
import "./AddressItem.scss";

function AddressItem({ loadUserInfo, data, setDataEdit, setModal }) {
  const processAddress = () => {
    return `${data.address}, ${data.ward}, ${data.district}, ${data.city}`;
  };

  const setDefaultAddress = async () => {
    const resDefaultAddress = await APISetDefaultAddress(data.id);
    if (!resDefaultAddress.response) loadUserInfo();
  };

  const deleteAddress = async () => {
    if (window.confirm("Bạn chắc chắn muốn xóa địa chỉ này?")) {
      const resDeleteAddress = await APIDeleteAddress(data.id);
      if (!resDeleteAddress.response) loadUserInfo();
    }
  };

  return (
    <>
      <div className="form-group row border-customer mx-1">
        <div className="col-md-6 p-0">
          <label className="col-sm-4 col-form-label text-sm-right">
            Họ và tên
          </label>
          <label className="col-sm-8 font-weight-bold">
            {data?.name}
            {data?.addressDefault && (
              <span className="badge badge-info ml-4">Mặc định</span>
            )}
          </label>
          <label className="col-sm-4 col-form-label text-sm-right">
            Số điện thoại
          </label>
          <label className="col-sm-8 font-weight-bold">
            {data?.phoneNumber}
          </label>
          <label className="col-sm-4 col-form-label text-sm-right">
            Địa chỉ
          </label>
          <label className="col-sm-8 font-weight-bold">
            {processAddress()}
          </label>
        </div>
        <div className="col-md-4 p-0 mr-5">
          <div className="text-md-right">
            <span
              className="text-underline text-secondary my-pointer"
              onClick={() => {
                setDataEdit(data);
                setModal(true);
              }}
            >
              Sửa
            </span>
            {!data?.addressDefault && (
              <span
                className="text-underline ml-3 text-secondary my-pointer"
                onClick={() => deleteAddress()}
              >
                Xoá
              </span>
            )}
          </div>
          <div className="text-center my-pointer">
            <span
              className={
                data.addressDefault
                  ? "d-inline-block float-md-right border text-center mt-4 pt-1 pb-1 pl-4 pr-4 text-secondary"
                  : "float-right d-inline-block border text-center mt-4 pt-1 pb-1 pl-4 pr-4"
              }
              onClick={() => {
                if (!data.addressDefault) setDefaultAddress();
              }}
            >
              Thiết lập mặc định
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddressItem;
