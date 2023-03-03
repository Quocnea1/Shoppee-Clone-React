import React from "react";
import "./VerifyEmailModal.scss";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { APIRegister } from "../../../../api/axios/customerAPI";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailModal({
  verifyEmailOTP,
  setVerifyEmailOTP,
}) {
  const { otp, password, email, phone, username } = verifyEmailOTP;

  const navigate = useNavigate();

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.number().typeError("Vui lòng chỉ nhập số"),
  });

  const onSubmit = async (values) => {
    if (values.otp === otp) {
      const resRegister = await APIRegister(password, username, phone, email);
      if (resRegister.status === 200) {
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } else {
      alert("Mã otp không đúng! Nhập lại hoặc có thể đăng kí lại để nhận mã otp khác.");
    }
  };

  return (
    <div className="verifyEmailModal">
      <div className="modal">
        <div className="modalOverlay"></div>
        <div className="modalBody">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="verigyEmailForm">
              <div className="title">
                <i className="fa-solid fa-shield-halved"></i>
                <span>
                  Để có thể khôi phục lại mật khẩu sau này, xin hãy xác thực
                  email bằng mã <b>OTP</b>{" "}
                  đã được gửi tới email bạn vừa đăng kí.
                </span>
              </div>
              <Field name="otp" placeholder="Mã 6 chữ số" className="input" />
              <ErrorMessage name="otp" component="div" className="error" />
              <div className="buttons">
                <span
                  className="cancel"
                  onClick={() => setVerifyEmailOTP(undefined)}
                >
                  Hủy
                </span>
                <button type="submit" className="btn button">
                  Gửi
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
