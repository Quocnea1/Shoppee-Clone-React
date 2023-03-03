import React from "react";
import CartBanner from "./CartBanner/CartBanner";
import { useEffect } from "react";
import { Layout } from "../../global/Layout/Layout";
import EmptyCart from "./EmptyCart/EmptyCart";
import FullCart from "./FullCart/FullCart";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartList = useSelector(state => state.carts.list);

  useEffect(() => {
    document.title = "Giỏ hàng";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart">
      <Layout>
        <CartBanner />
        {cartList ? <FullCart /> : <EmptyCart />}
      </Layout>
    </div>
  );
}
