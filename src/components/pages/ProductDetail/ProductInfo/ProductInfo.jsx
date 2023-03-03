import ImageSection from "./ImageSection/ImageSection";
import InfoSection from "./InfoSection/InfoSection";
import "./ProductInfo.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { collectionActions } from "../../../../api/redux/slices/collectionSlice";
import {
  APIGetProductInfo,
  APIGetProductType,
} from "../../../../api/axios/productAPI";
import { useLocation } from "react-router-dom";

function ProductInfo() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [productData, setProductData] = useState();

  const loadProductType = async () => {
    const resType = await APIGetProductType(location.state.productId);
    if (resType.status === 200) {
      const updateType = collectionActions.updateCurrentType(resType.data);
      dispatch(updateType);
    }
  };

  const loadProductInfo = async () => {
    console.log("calling product info api");
    const resInfo = await APIGetProductInfo(location.state.productId);
    if (resInfo.status === 200) {
      setProductData(resInfo.data);
    }
  };

  useEffect(() => {
      loadProductInfo();
      loadProductType();
  }, [location]);

  return (
    <div className="productInfo">
      <div className="container">
        <div className="wrapper">
          {productData && (
            <>
              <ImageSection data={productData} />
              <InfoSection data={productData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
