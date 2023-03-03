import "./Login.scss";
import React, { useEffect } from "react";
import { imageDataLogin } from "../../../utils/dataConfig";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { APILogin, APIMyProfile } from "../../../api/axios/customerAPI";
import { useState } from "react";
import MessageModal from "../../global/MessageModal/MessageModal";
import { userActions } from "../../../api/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Footer } from "../../global/Footer/Footer";
import Header2 from "../../global/Header2/Header2";
import { BeatLoader } from "react-spinners";

export default function Login() {
  const [modal, setModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [facebookIcon, googleIcon, backgroundLogin] = imageDataLogin.images;

  const jwt = searchParams.get("jwt");
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");

  const handleLogin = async ({ username, password }) => {
    const res = await APILogin(username, password);
    if (res.data) {
      window.sessionStorage.setItem("jwt", res.data.jwt);
      window.sessionStorage.setItem("role", res.data.role[0].authority);
      window.sessionStorage.setItem("id", res.data.id);
      if (res.data.role[0].authority === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        const resInfo = await APIMyProfile();
        if (resInfo.data) {
          window.sessionStorage.setItem("username", resInfo.data.username);
          window.sessionStorage.setItem(
            "avatar",
            resInfo.data.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          );
          const updateUserInfo = userActions.updateUserInfo({
            username: resInfo.data.username,
            name: resInfo.data.name,
            email: resInfo.data.email,
            phone: resInfo.data.phone,
            gender: resInfo.data.gender,
            dob: resInfo.data.dob,
            avatar: resInfo.data.avatar,
            addresses: resInfo.data.addressEntityList,
          });
          dispatch(updateUserInfo);
          navigate(location.state?.productId !== undefined ? -1 : "/");
        }
      }
    } else if (res.response.status === 400) setModal(true);
  };

  const googleLogin = async () => {
    console.log("calling api login google");
    window.sessionStorage.setItem("jwt", jwt);
    window.sessionStorage.setItem("role", "ROLE_USER");
    window.sessionStorage.setItem("id", userId);

    const resInfo = await APIMyProfile();
    if (resInfo.data) {
      window.sessionStorage.setItem("username", resInfo.data.username);
      window.sessionStorage.setItem(
        "avatar",
        resInfo.data.avatar ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );
      const updateUserInfo = userActions.updateUserInfo({
        username: resInfo.data.username,
        name: resInfo.data.name,
        email: resInfo.data.email,
        phone: resInfo.data.phone,
        gender: resInfo.data.gender,
        dob: resInfo.data.dob,
        avatar: resInfo.data.avatar,
        addresses: resInfo.data.addressEntityList,
      });
      dispatch(updateUserInfo);
      navigate(location.state?.productId ? -1 : "/");
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const validate = Yup.object().shape({
    username: Yup.string().required("Vui lòng điền vào mục này"),
    password: Yup.string().required("Vui lòng điền vào mục này"),
  });

  const onSubmit = (fields) => {
    handleLogin(fields);
  };

  useEffect(() => {
    document.title = "Đăng nhập";
    window.scrollTo(0, 0);

    if(window.sessionStorage.getItem("jwt")){
      navigate("/")
    }
  }, []);

  useEffect(() => {
    if (jwt !== null) {
      googleLogin();
    }
  }, [jwt, userId, username]);

  return (
    <>
      <Header2 title="Đăng Nhập" />
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched, dirty, isValid }) => (
          <div className="login">
            {modal && (
              <MessageModal
                message={"Username or Password invalid"}
                type={"error"}
                setModal={setModal}
              />
            )}
            <div className="container">
              <div
                className="backgroundImg"
                style={{ backgroundImage: `url(${backgroundLogin})` }}
              >
                <Form className="authFormLogin">
                  <div className="wrap">
                    <div className="loginTitle">Đăng nhập</div>
                    <div className="loginInput">
                      <Field
                        placeholder="Email / Tên đăng nhập"
                        name="username"
                        className={
                          errors.username && touched.username
                            ? "loginInputUser input-error"
                            : "loginInputUser"
                        }
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="errorUsername"
                      />
                      <Field
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        className={
                          errors.password && touched.password
                            ? "loginInputPassword input-error"
                            : "loginInputPassword"
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="errorPassword"
                      />
                    </div>
                    <button
                      // className="loginBtn"
                      type="submit"
                      className={
                        !(dirty && isValid)
                          ? "loginBtn disabled-btn"
                          : "loginBtn"
                      }
                      disabled={!(dirty && isValid)}
                    >
                      {isSubmitting ? (
                        <BeatLoader
                          speedMultiplier={0.8}
                          margin={5}
                          size={10}
                          color="#fff"
                        />
                      ) : (
                        "Đăng Nhập"
                      )}
                    </button>
                    <span
                      className="linkForgotPassWord"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Quên mật khẩu
                    </span>
                    <div className="otherLogin">
                      <span className="line line1"></span>
                      <span className="otherLoginText">HOẶC</span>
                      <span className="line line2"></span>
                    </div>
                    <div className="otherLoginBtn">
                      <button className="otherLoginbutton btn">
                        <img
                          src={facebookIcon}
                          alt=""
                          className="otherLoginFaIcon"
                        />
                        <span className="otherLoginTitle">Facebook</span>
                      </button>
                      <button
                        type="button"
                        className="otherLoginbutton btn"
                        onClick={() => {
                          window.open("https://shopeeeee.herokuapp.com/oauth2/authorization/google", "_self");
                        }}
                      >
                        <img
                          src={googleIcon}
                          alt=""
                          className="otherLoginGoIcon"
                        />
                        <span className="otherLoginTitle">Google</span>
                      </button>
                    </div>
                    <div className="gotoRegister">
                      <h5 className="recomendText">
                        Bạn chưa biết đến shopee?
                      </h5>
                      <span
                        className="linkRegister"
                        onClick={() => navigate("/register")}
                      >
                        Đăng ký
                      </span>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <Footer />
    </>
  );
}
