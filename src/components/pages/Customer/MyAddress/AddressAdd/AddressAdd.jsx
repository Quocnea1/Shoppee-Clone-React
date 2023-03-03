import "./AddressAdd.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import cities from "../../../../../utils/cities.json";
import districts from "../../../../../utils/districts.json";
import wards from "../../../../../utils/wards.json";
import React, { useState } from "react";
import {
  APIAddAddress,
  APIEditAddress,
} from "../../../../../api/axios/customerAPI";

export default function AddressAdd({
  loadUserInfo,
  setModal,
  dataEdit,
  setDataEdit,
  message = "Thêm địa chỉ mới",
}) {
  const [districtAvailable, setDistrictAvailable] = useState(
    dataEdit ? true : false
  );
  const [wardAvailable, setWardAvailable] = useState(dataEdit ? true : false);
  const [addAddressFailed, setAddAddressFailed] = useState(false);

  const convertAddressToCode = () => {
    let cityCode = "";
    let districtCode = "";
    let wardCode = "";
    if (dataEdit) {
      cityCode = cities.find((c) => c.name_with_type === dataEdit.city).code;
      districtCode = districts.find(
        (d) => d.name_with_type === dataEdit.district && d.parent_code === cityCode
      ).code;
      wardCode = wards.find((w) => w.name_with_type === dataEdit.ward && w.parent_code === districtCode).code;
    }
    return { cityCode, districtCode, wardCode };
  };
  const address = convertAddressToCode();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const initialValues = {
    name: dataEdit?.name || "",
    phone: dataEdit?.phoneNumber || "",
    city: address.cityCode,
    district: address.districtCode,
    ward: address.wardCode,
    address: dataEdit?.address || "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "Tối đa 50 kí tự").required("Tên trống"),
    phone: Yup.string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Số điện thoại trống"),
    city: Yup.number().required("Thông tin trống"),
    district: Yup.number().required("Thông tin trống"),
    ward: Yup.number().required("Thông tin trống"),
    address: Yup.string().required("Thông tin trống"),
  });

  const cityChoosen = (e, setFieldValue) => {
    if (e.target.value === "") {
      setFieldValue("district", "");
      setFieldValue("ward", "");
      setDistrictAvailable(false);
    } else setDistrictAvailable(true);
    setFieldValue("city", e.target.value);
  };

  const districtChoosen = (e, setFieldValue) => {
    if (e.target.value === "") {
      setFieldValue("ward", "");
      setWardAvailable(false);
    } else setWardAvailable(true);
    setFieldValue("district", e.target.value);
  };

  const onSubmit = async (fields) => {
    let cityName = cities.find((c) => c.code === fields.city).name_with_type;
    let districtName = districts.find(
      (d) => d.code === fields.district
    ).name_with_type;
    let wardName = wards.find((w) => w.code === fields.ward).name_with_type;

    if (dataEdit) {
      const resEditAddress = await APIEditAddress({
        address: fields.address,
        name: fields.name,
        phone: fields.phone,
        city: cityName,
        district: districtName,
        ward: wardName,
        id: dataEdit.id,
      });
      if (resEditAddress.response) setAddAddressFailed(true);
      else {
        setModal(false);
        loadUserInfo();
      }
    } else {
      const resAddAddress = await APIAddAddress({
        address: fields.address,
        name: fields.name,
        phone: fields.phone,
        city: cityName,
        district: districtName,
        ward: wardName,
      });
      if (resAddAddress.response) setAddAddressFailed(true);
      else {
        setModal(false);
        loadUserInfo();
      }
    }
  };

  return (
    <div className="addressAdd">
      <div className="modal">
        <div
          className="modalOverlay"
          onClick={() => {
            setModal(false);
            setDataEdit(undefined);
          }}
        ></div>
        <div className="modalBody">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="modalTitle">{message}</div>
                <div className="field">
                  <label htmlFor="name" className="label">
                    Họ và Tên
                  </label>
                  <label htmlFor="phone" className="label">
                    Số điện thoại
                  </label>
                  <div className="">
                    <Field id="name" name="name" className="input" />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="error"
                    />
                  </div>
                  <div className="">
                    <Field id="phone" name="phone" className="input" />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="error"
                    />
                  </div>
                </div>
                <div className="addressField">
                  <span className="label">Địa chỉ</span>
                  <div className="addressInnerField">
                    <div className="">
                      <Field
                        name="city"
                        className="input"
                        as="select"
                        onChange={(e) => cityChoosen(e, setFieldValue)}
                      >
                        <option value="">Thành phố/Tỉnh</option>
                        {cities.map((data, index) => (
                          <option value={data.code} key={index}>
                            {data.name_with_type}
                          </option>
                        ))}
                      </Field>
                      <i className="fa-solid fa-angle-down icon-down"></i>
                      <ErrorMessage
                        component="div"
                        name="city"
                        className="error"
                      />
                    </div>
                    <div className="">
                      <Field
                        name="district"
                        className="input"
                        as="select"
                        onChange={(e) => districtChoosen(e, setFieldValue)}
                      >
                        <option value="">Quận/Huyện</option>
                        {districtAvailable &&
                          districts.map((data, index) =>
                            data.parent_code === values.city ? (
                              <option value={data.code} key={index}>
                                {data.name_with_type}
                              </option>
                            ) : null
                          )}
                      </Field>
                      <i className="fa-solid fa-angle-down icon-down"></i>
                      <ErrorMessage
                        component="div"
                        name="district"
                        className="error"
                      />
                    </div>
                    <div className="">
                      <Field name="ward" className="input" as="select">
                        <option value="">Xã/Phường</option>
                        {wardAvailable &&
                          wards.map((data, index) =>
                            data.parent_code === values.district ? (
                              <option value={data.code} key={index}>
                                {data.name_with_type}
                              </option>
                            ) : null
                          )}
                      </Field>
                      <i className="fa-solid fa-angle-down icon-down"></i>
                      <ErrorMessage
                        component="div"
                        name="ward"
                        className="error"
                      />
                    </div>
                    <div className="">
                      <Field
                        placeholder="Địa chỉ chi tiết (Đường, hẻm,...)"
                        id="address"
                        name="address"
                        className="input big"
                        as="textarea"
                      />
                      <ErrorMessage
                        component="div"
                        name="address"
                        className="error"
                      />
                    </div>
                  </div>
                </div>
                <input value="Lưu" type="submit" className="submit" />
              </Form>
            )}
          </Formik>
          {addAddressFailed && (
            <div className="addAddressFailed">
              Lưu địa chỉ lỗi, vui lòng thử lại sau
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
