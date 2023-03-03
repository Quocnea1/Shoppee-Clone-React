import { Layout } from "../../global/Layout/Layout";
import "./Collection.scss";
import React, { useEffect } from "react";
import { ProductSection } from "./ProductSection/ProductSection";
import BannerTop from "./BannerTop/BannerTop";
import { bannerTopData } from "./../../../utils/dataConfig";
export const Collection = () => {

  useEffect(() => {
    document.title = "Bộ sưu tập";
    window.scrollTo(0, 0);

  }, []);
  return (
    <div className="collection">
      <Layout>
        <BannerTop data={bannerTopData} />
        <ProductSection />
      </Layout>
    </div>
  );
};
