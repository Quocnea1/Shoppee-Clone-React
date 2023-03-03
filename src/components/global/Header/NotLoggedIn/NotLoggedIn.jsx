import "./NotLoggedIn.scss";
import { useNavigate } from "react-router-dom";

function NotLoggedIn() {
  const navigate = useNavigate();

  return (
    <>
      <li
        className="header__nav__item header__nav__item--strong header__nav__item--sparatest"
        onClick={() => navigate("/register")}
      >
        Đăng Ký
      </li>
      <li
        className="header__nav__item header__nav__item--strong"
        onClick={() => navigate("/login")}
      >
        Đăng Nhập
      </li>
    </>
  );
}

export default NotLoggedIn;
