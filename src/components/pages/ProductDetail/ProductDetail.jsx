import { Layout } from "../../global/Layout/Layout";
import React, { useEffect } from "react";
import "./ProductDetail.scss";
import ProductInfo from "./ProductInfo/ProductInfo";
import Description from "./Description/Description";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import { productCategory } from "../../../utils/dataConfig";
import RatingSection from "./RatingSection/RatingSection";
// import { useParams } from "react-router-dom";

function ProductDetail() {
  const { category, subCategory, item } = productCategory;

  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
    window.scrollTo(0, 0);
  });

  return (
    <div className="productDetail">
      <Layout>
        <Breadcrumbs
          category={category}
          subCategory={subCategory}
          item={item}
        />
        <ProductInfo />
        <Description />
        <RatingSection />
      </Layout>
    </div>
  );
}

export default ProductDetail;
