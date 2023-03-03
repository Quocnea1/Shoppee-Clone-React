import React from "react";
import Widgets from "./Widgets/Widgets.jsx";
import Products from "./Products/Products.jsx";
import { topProductsImages } from "./../../../../../utils/dataConfig";
import "./TopProduct.scss";
import { useSelector } from "react-redux";
export default function TopProduct() {
  const topProducts = useSelector((state) => state.admin.topProducts);
  return (
    <div className="adminContainer top-product-container">
      <Widgets />
      <h1 className="title">Top Products</h1>
      {topProducts?.map((data, index) => (
        <Products data={data} key={index} />
      ))}
    </div>
  );
}
