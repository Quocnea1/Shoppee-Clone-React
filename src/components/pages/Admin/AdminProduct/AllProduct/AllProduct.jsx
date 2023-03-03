import React from "react";
import Products from "./Products/Products.jsx";
import { allProducts } from "./../../../../../utils/dataConfig";
import "./AllProduct.scss";
import { useSelector } from "react-redux";

export default function AllProduct({ setInitialFormValues, setIsAddProduct }) {
  const products = useSelector((state) => state.admin.allProducts);
  return (
    <div className="adminContainer all-product-container">
      <h1 className="allProductTitle">All Products</h1>
      <div className="allProductSection">
        {products?.map((data, index) => (
          <Products
            typeLabel={allProducts.typeLabel}
            data={data}
            setInitialFormValues={setInitialFormValues}
            setIsAddProduct={setIsAddProduct}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
