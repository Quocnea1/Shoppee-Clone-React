import React, { useState } from "react";
import "../ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { APIGetOTP } from "../../../../api/axios/customerAPI";
import { useDispatch } from "react-redux";
import { forgotPasswordActions } from "./../../../../api/redux/slices/forgotPasswordSlice";
import MessageModal from "../../../global/MessageModal/MessageModal";

export default function FillEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const initialValues = {
    email: "",
  };

  const validate = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng điền vào mục này"),
  });

  const onSubmit = async (fields) => {
    const userEmail = fields.email;
    const resOTP = await APIGetOTP(userEmail);
    console.log(resOTP);
    if (resOTP.status === 200) {
      const updateEmail = forgotPasswordActions.updateEmail({
        email: fields.email,
      });
      dispatch(updateEmail);
      const updateOTP = forgotPasswordActions.updateOTP({
        otp: resOTP.data.otp,
      });
      dispatch(updateOTP);
      navigate(`otp`);
    }
    if (resOTP.response.status === 400) {
      setModal(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form className="authFormReset">
          {modal && (
            <MessageModal
              message={"Email không tồn tại"}
              type={"error"}
              setModal={setModal}
            />
          )}
          <div className="forgotPassword">
            <div className="card fillForm">
              <div className="card-body">
                <div className="cardTitle text-center">
                  <span onClick={() => navigate(-1)} className="icon">
                    <i className="fa-solid fa-arrow-left" />
                  </span>
                  <h3 className="title">Đặt lại mật khẩu</h3>
                </div>
                <div className="card-text">
                  <div className="formText">
                    <div className="form-group">
                      <Field
                        type="email"
                        className="form-control text-center"
                        placeholder="Nhập email"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="mt-2 text-danger">{errors.email}</div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className={
                        !(dirty && isValid)
                          ? "btn btn-block disabled-btn"
                          : "btn btn-block"
                      }
                      disabled={!(dirty && isValid)}
                    >
                      TIẾP THEO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
