import "./LoggedIn.scss";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../../api/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../../api/redux/slices/cartSlice";

function LoggedIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = window.sessionStorage.getItem("username");
  const avatar = window.sessionStorage.getItem("avatar");

  const handleLogout = () => {
    window.sessionStorage.clear();
    const logoutAction = userActions.resetUserInfo();
    const logoutAction2 = cartActions.resetCart()
    dispatch(logoutAction);
    dispatch(logoutAction2);
    navigate("/login");
  };

  return (
    <li className="header__nav__item header__nav-user">
      <img src={avatar} alt="Avatar" className="header__nav-user-img" />
      <span className="header__nav-user-name">{username}</span>
      <ul className="header__nav-user-menu">
        <li className="header__nav-user-item">
          <span onClick={() => navigate("/customer")}>Tài khoản của tôi</span>
        </li>
        <li className="header__nav-user-item">
          <span onClick={() => handleLogout()}>Đăng xuất</span>
        </li>
      </ul>
    </li>
  );
}

export default LoggedIn;
