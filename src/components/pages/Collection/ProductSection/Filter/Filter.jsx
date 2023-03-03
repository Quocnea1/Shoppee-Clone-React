import "./Filter.scss";
import { SubCategoryList } from "./SubCategoryList/SubCategoryList";
import { useEffect, useState } from "react";
import { APILoadSubCategoryByCategoryId } from "../../../../../api/axios/categoryAPI";
import { categoryActions } from "../../../../../api/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

export const Filter = ({ filterPrice, setFilterPrice, loadCollection }) => {
  const [currentChooseIndex, setCurrentChooseIndex] = useState(-1);

  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const subCategoryList = useSelector(
    (state) => state.categories.currentSubCategoryList
  );

  const loadData = async () => {
    console.log("calling subcategory by category id");
    const res = await APILoadSubCategoryByCategoryId(
      location.state?.categoryId
    );
    if (res.status === 200) {
      const updateSubcategoryAction = categoryActions.updateSubcategory(
        res.data
      );
      dispatch(updateSubcategoryAction);
    } else if (res.response.status === 400) {
      const resetSubcategoryAction = categoryActions.resetSubList();
      dispatch(resetSubcategoryAction);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryName = () => {
    const temp = window.location.pathname;
    return temp.includes("search") ? "Danh mục" : slug;
  };

  const handleFilterPrice = (e, isMin) => {
    if (isMin) setFilterPrice({ ...filterPrice, min: e.target.value });
    else setFilterPrice({ ...filterPrice, max: e.target.value });
  };

  const handleSearchPrice = () => {
    if (filterPrice.min !== 0 || filterPrice.max !== Number.MAX_SAFE_INTEGER)
      loadCollection(
        filterPrice.min,
        filterPrice.max < filterPrice.min ? Number.MAX_SAFE_INTEGER : filterPrice.max,
        subCategoryList[currentChooseIndex]?.id
      );
  };

  const handleSearchSubCategory = (index, subId) => {
    setCurrentChooseIndex(index);
    loadCollection(filterPrice.min, filterPrice.max, subId);
  };

  return (
    <div className="filter">
      <div className="category">
        <h3 className="category__heading">
          <i className="category__heading-icon fa-solid fa-list"></i>
          Tất Cả Danh Mục
        </h3>
        <ul className="category-list category-list--active">
          <span
            className="category-list__link"
            onClick={() => handleSearchSubCategory(-1, null)}
          >
            {handleCategoryName() || "Danh mục"}
          </span>
          {subCategoryList.map((data, index) => (
            <li
              key={index}
              className={
                index === currentChooseIndex
                  ? "category-item category-item--active"
                  : "category-item"
              }
              onClick={() => handleSearchSubCategory(index, data.id)}
            >
              <span className="category-item__link">{data.name}</span>
            </li>
          ))}
        </ul>
        <div className="category__price">
          <input
            className="category__price-input category__price-from"
            type="number"
            placeholder="Từ"
            min={0}
            onChange={(e) => handleFilterPrice(e, true)}
          />
          <input
            className="category__price-input category__price-to"
            type="number"
            placeholder="Đến"
            min={0}
            onChange={(e) => handleFilterPrice(e, false)}
          />
        </div>
        <button
          className="category__search-button btn btn--primary"
          onClick={() => handleSearchPrice()}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};
