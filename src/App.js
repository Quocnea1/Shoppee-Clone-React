import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import { Collection } from "./components/pages/Collection/Collection";
import ProductDetail from "./components/pages/ProductDetail/ProductDetail";
import Cart from "./components/pages/Cart/Cart";
import Register from "./components/pages/Register/Register";
import Customer from "./components/pages/Customer/Customer";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import FillEmail from "./components/pages/ForgotPassword/FillEmail/FillEmail";
import OTP from "./components/pages/ForgotPassword/OTP/OTP";
import ResetPassword from "./components/pages/ForgotPassword/ResetPassword/ResetPassword";
import News from "./components/pages/News/News";
import Login from "./components/pages/Login/Login";
import Admin from "./components/pages/Admin/Admin";
import AdminDashBoard from "./components/pages/Admin/AdminDashBoard/AdminDashBoard";
import AdminProduct from "./components/pages/Admin/AdminProduct/AdminProduct";
import AdminCustomer from "./components/pages/Admin/AdminCustomer/AdminCustomer";
import AdminOrder from "./components/pages/Admin/AdminOrder/AdminOrder";
import CheckOut from "./components/pages/CheckOut/CheckOut";
import AdminCategory from "./components/pages/Admin/AdminCategory/AdminCategory";
import PaymentNotification from "./components/pages/PaymentNotification/PaymentNotification"
import { Social } from "./components/global/Social/Social";

function App() {
  return (
    <>
      <Social />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/collection/:slug" element={<Collection />} />
          <Route path="/collection/search/:slug" element={<Collection />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout/notification" element={<PaymentNotification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/forgot-password" element={<ForgotPassword />}>
            <Route index element={<FillEmail />} />
            <Route path="otp" element={<OTP />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:preRoute" element={<Login />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="customers" element={<AdminCustomer />} />
            <Route path="orders" element={<AdminOrder />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
