import "./ProductSection.scss";
import { Filter } from "./Filter/Filter";
import { Navigate } from "./Navigate/Navigate";
import { ProductFrame } from "../../../global/ProductFrame/ProductFrame";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collectionActions } from "../../../../api/redux/slices/collectionSlice";
import { APISearchProduct } from "../../../../api/axios/productAPI";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useLocation } from "react-router-dom";
import { limitProductCollection } from "../../../../utils/dataConfig";

export const ProductSection = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const collection = useSelector((state) => state.collection);

  const [currentPage, setCurrentPage] = useState(
    useSelector((state) => state.collection.currentPage) || 1
  );
  const [noProduct, setNoProduct] = useState(false);
  const [filterPrice, setFilterPrice] = useState({
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  });

  const loadCollection = async (min, max, subId) => {
    console.log("calling api get product in collection");
    const res = await APISearchProduct({
      page: currentPage,
      limit: limitProductCollection,
      cat: location.state?.categoryId,
      keyword: location.state?.keyword,
      minPrice: min,
      maxPrice: max,
      sub: subId
    });
    if (res.status === 200) {
      setNoProduct(false);
      const productSectionAction = collectionActions.updateList({
        list: res.data.list,
        currentPage: currentPage || 1,
        itemCount: res.data.itemsNumber,
        limit: limitProductCollection,
      });
      dispatch(productSectionAction);
    } else if (res.response.status === 404) {
      setNoProduct(true);
    }
  };

  useEffect(() => {
    loadCollection(filterPrice.min, filterPrice.max);
    const currentPageAction = collectionActions.updateCurrentPage(currentPage);
    dispatch(currentPageAction);
  }, [currentPage]);

  // useEffect(() => {
  //   loadCollection();
  // }, []);

  const loading = {
    margin: "50px auto",
  };

  return (
    <div className="productSection">
      <div className="container">
        <div className="wrapper">
          <Filter filterPrice={filterPrice} setFilterPrice={setFilterPrice} loadCollection={loadCollection} />
          <div className="products">
            <div className="title">
              <div>Các mặt hàng</div>
            </div>
            {noProduct ? (
              <div className="noProduct">
                <i className="fa-solid fa-magnifying-glass-minus"></i>
                Không có sản phẩm bạn cần tìm
              </div>
            ) : collection.list.length <= 0 ? (
              <PropagateLoader color="#ee4d2d" cssOverride={loading} />
            ) : (
              <>
                <div className="items">
                  {collection.list.map((data, index) => (
                    <ProductFrame data={data} key={index} />
                  ))}
                </div>
                <Navigate
                  totalPage={Math.ceil(collection.itemCount / collection.limit)}
                  loadCollection={loadCollection}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
