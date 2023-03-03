import React, { useState } from "react";
import "../ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import MessageModal from "../../../global/MessageModal/MessageModal";

export default function OTP() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const otp1 = useSelector((state) => state.forgotPassword.otp);

  const initialValues = {
    otp: "",
  };

  const validate = Yup.object().shape({
    otp: Yup.string().required("Vui lòng điền vào mục này"),
  });

  const onSubmit = (fields) => {
    if (fields.otp === otp1) {
      navigate(`../reset`);
    } else {
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
              message={"OTP không hợp lệ"}
              type={"error"}
              setModal={setModal}
            />
          )}
          <div className="OTP">
            <div className="forgotPassword">
              <div className="card fillForm">
                <div className="card-body">
                  <div className="cardTitle text-center">
                    <span onClick={() => navigate(-1)} className="icon">
                      <i className="fa-solid fa-arrow-left" />
                    </span>
                    <h3 className="title">Nhập mã OTP</h3>
                    <h6 className="mt-3">
                      Vui lòng check email vừa nhập để lấy mã OTP
                    </h6>
                  </div>
                  <div className="card-text">
                    <div className="formText">
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control text-center"
                          placeholder="OTP gồm 6 số"
                          name="otp"
                        />
                        {errors.otp && touched.otp ? (
                          <div className="mt-2 text-danger">{errors.otp}</div>
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
                        OK
                      </button>
                    </div>
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
