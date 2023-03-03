import React from "react";
import "./CustomerModal.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const CustomerModal = ({ onToggle, data }) => {

  const listAddress = data.addressEntityList;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const initialValues = {
    username: data.username || "",
    name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    gender: data.gender || "",
    dob: data.dob || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "Tối đa 50 kí tự").required("Tên trống"),
    phone: Yup.string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Số điện thoại trống"),
    email: Yup.string().required("Thông tin trống"),
    gender: Yup.string().required("Thông tin trống"),
    dob: Yup.number().required("Thông tin trống"),
  });

  return (
    <div className="customerModal">
      <div className="modal">
        <div className="modalOverlay" onClick={() => onToggle(false)
        }></div>
        <div className="modalBody">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}

          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="modalTitle">Thông tin chi tiết</div>
                <div className="field">
                  <label htmlFor="name" className="label">
                    Tên
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
                  <label htmlFor="username" className="label">
                    Tên Tài Khoản
                  </label>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="">
                    <Field id="username" name="username" className="input" />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="error"
                    />
                  </div>
                  <div className="">
                    <Field id="email" name="email" className="input" />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="error"
                    />
                  </div>
                  <label htmlFor="dob" className="label">
                    Ngày sinh
                  </label>
                  <label
                    className="form-check-label label"
                    htmlFor="gender"
                  >
                    Giới tính
                  </label>
                  <div className="">
                    <Field id="dob" name="dob" type="date" className="input" />
                    <ErrorMessage
                      component="div"
                      name="dob"
                      className="error"
                    />
                  </div>
                  <div className="form-check form-check-inline checkRadio">
                    <div className="gender">
                      <Field
                        className="form-check-input"
                        id="male"
                        type="radio"
                        value="1"
                        name="gender"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="male"
                      >
                        Nam
                      </label>
                    </div>
                    <div className="gender">
                      <Field
                        className="form-check-input"
                        id="female"
                        type="radio"
                        value="2"
                        name="gender"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="female"
                      >
                        Nữ
                      </label>
                    </div>
                    <div className="gender">
                      <Field
                        className="form-check-input"
                        id="other"
                        type="radio"
                        value="3"
                        name="gender"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="other"
                      >
                        Khác
                      </label>
                    </div>
                  </div>
                </div>
                <div className="customerField">
                  <span className="label">Địa chỉ</span>
                  <div className="customerInnerField">
                      <div className="customerAllAddress">
                        {listAddress.map((_data) => (
                          <div className="customerAddress">
                            {_data.address}, {_data.ward}, {_data.district}, {_data.city}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;