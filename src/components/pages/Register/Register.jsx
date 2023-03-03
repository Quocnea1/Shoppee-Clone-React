import React, { useEffect } from "react";
import { Footer } from "../../global/Footer/Footer";
import Header2 from "../../global/Header2/Header2";
import RegisterBody from "./RegisterBody/RegisterBody";

function Register() {
  useEffect(() => {
    document.title = "Đăng Kí";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header2 title="Đăng Kí" />
      <RegisterBody />
      <Footer />
    </div>
  );
}
export default Register;
