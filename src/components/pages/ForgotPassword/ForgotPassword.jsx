import React from "react";
import { Header } from "../../global/Header/Header";
import "./ForgotPassword.scss";
import { Outlet } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="ForgotPassword">
      <Header />
      <Outlet />
    </div>
  );
}
