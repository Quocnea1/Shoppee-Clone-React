import React, { useState } from "react";
import "../ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { APISetNewPassword } from "../../../../api/axios/customerAPI";
import { useSelector } from "react-redux";
import MessageModal from "../../../global/MessageModal/MessageModal";

export default function ResetPassword() {
  let navigate = useNavigate();
  const email = useSelector((state) => state.forgotPassword.email);
  const [modal, setModal] = useState(false);

  const initialValues = {
    newPassword: "",
    newPasswordAgain: "",
  };

  const validate = Yup.object().shape({
    newPassword: Yup.string()
      .required("Vui lòng điền vào mục này")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Mật khẩu phải bao gồm ít nhất 8 kí tự, trong đó có 1 chữ hoa, 1 chữ số và 1 kí tự đặc biệt"
      ),
    newPasswordAgain: Yup.string()
      .required("Vui lòng điền vào mục này")
      .oneOf([Yup.ref("newPassword")], "Mật khẩu không trùng khớp"),
  });

  const onSubmit = async (values) => {
    const resSetNew = await APISetNewPassword(email, values.newPassword);
    if (resSetNew.status === 200) {
      setModal(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
              message={"Đổi mật khẩu thành công\nChuyển trang trong 3 giây"}
              type={"success"}
              setModal={setModal}
            />
          )}
          <div className="ResetPassword">
            <div className="forgotPassword">
              <div className="card fillForm">
                <div className="card-body">
                  <div className="cardTitle text-center">
                    <span onClick={() => navigate(-1)} className="icon">
                      <i className="fa-solid fa-arrow-left" />
                    </span>
                    <h3 className="title">Đặt lại mật khẩu mới</h3>
                  </div>
                  <div className="card-text">
                    <div className="formText">
                      <div className="form-group">
                        <Field
                          type="password"
                          className="form-control text-center"
                          placeholder="Mật khẩu mới"
                          name="newPassword"
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <div className="mt-2 text-danger">
                            {errors.newPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <Field
                          type="password"
                          className="form-control text-center"
                          placeholder="Nhập lại mật khẩu mới"
                          name="newPasswordAgain"
                        />
                        {errors.newPasswordAgain && touched.newPasswordAgain ? (
                          <div className="mt-2 text-danger">
                            {errors.newPasswordAgain}
                          </div>
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
