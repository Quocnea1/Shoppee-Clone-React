import "./AdminProduct.scss";

import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import AllProduct from "./AllProduct/AllProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIGetProducts } from "../../../../api/axios/productAPI";
import { adminActions } from "../../../../api/redux/slices/adminSlice";

export default function AdminProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.admin.allProducts);

  const loadData = async () => {
    console.log("calling admin api product");
    const resAllProduct = await APIGetProducts(1, 5000);

    const updateProductAction = adminActions.updateProduct(resAllProduct.data.list);

    dispatch(updateProductAction);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("role") === "ROLE_ADMIN") {
      if (productList.length <= 0) loadData();
    } else if (window.sessionStorage.getItem("role") === "ROLE_USER")
      navigate("/");
    else navigate("/login");
  }, []);

  const [initialFormValues, setInitialFormValues] = useState({
    id: -1,
    name: "",
    types: [
      {
        quantity: 1,
        price: 0,
        type: "",
      },
    ],
    imageProduct: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    detail: "",
    describe: "",
    subCategoryId: "",
  });
  const [isAddProduct, setIsAddProduct] = useState(true);

  return (
    <div className="adminProduct">
      <AddProduct
        initialFormValues={initialFormValues}
        setInitialFormValues={setInitialFormValues}
        setIsAddProduct={setIsAddProduct}
        isAddProduct={isAddProduct}
      />
      <AllProduct
        setInitialFormValues={setInitialFormValues}
        setIsAddProduct={setIsAddProduct}
      />
    </div>
  );
}
