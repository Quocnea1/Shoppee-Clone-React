import { Layout } from "../../global/Layout/Layout";
import React, { useEffect } from "react";
import "./Home.scss";
import { RecommendToday } from "./RecommendToday/RecommendToday";
import HeroBanner from "./HeroBanner/HeroBanner";
import { Category } from "./Category/Category";
import SearchTrending from "./SearchTrending/SearchTrending";
import { APIGetProducts } from "../../../api/axios/productAPI";
import { collectionActions } from "../../../api/redux/slices/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { APIGetAllCategory } from "../../../api/axios/categoryAPI";
import { categoryActions } from "../../../api/redux/slices/categorySlice";
import { limitProductRecommend } from "../../../utils/dataConfig";

export const Home = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories.list);

  const loadRecommend = async () => {
    console.log("calling recommend api");
    const res = await APIGetProducts(1, limitProductRecommend);
    if (res) {
      const reCommendTodayAction = collectionActions.updateList({
        list: res.data.list,
        currentPage: 1,
        itemCount: res.data.itemsNumber,
        limit: limitProductRecommend,
      });
      dispatch(reCommendTodayAction);
    }
  };
  const loadCategory = async () => {
    console.log("calling get category api");
    const res = await APIGetAllCategory();
    if (res) {
      const categoryAction = categoryActions.updateList({
        list: res.data,
      });
      dispatch(categoryAction);
    }
  };

  useEffect(() => {
    document.title = "Trang chủ";
    window.scrollTo(0, 0);

    loadRecommend();
    if (categoryList.length <= 0) loadCategory();
  }, []);

  return (
    <div className="home">
      <Layout>
        <HeroBanner />
        <Category />
        <SearchTrending />
        <RecommendToday />
      </Layout>
    </div>
  );
};
