import React, { useState } from "react";
import { useSelector } from "react-redux";
import SubCategory from "../SubCategory/SubCategory";
import "./CategoryItem.scss";

export default function CategoryItem({ setIsEdit, setInitialFormValues, data }) {
  const [showMore, setShowMore] = useState(false);
  const subCategories = useSelector((state) => state.admin.subCategories);

  const formatSubList = () => {
    let temp = subCategories.filter((s) => s.categoryId === data.id);
    let temp2 = [];
    for (let i = 0; i < temp.length; i++) {
      temp2.push(temp[i].name);
    }
    return temp2;
  };

  const EditCategoryClick = () => {
    setInitialFormValues({
      name: data.name,
      sub_category: formatSubList(),
      shopId: data.shopId,
      image: data.image,
      id: data.id,
    })
    setIsEdit(true)
  };

  return (
    <div>
      <div className="categoryItem">
        <div className="categoryName">
          <figure className="thumbnail">
            <img src={data.image} alt="thumbnailCategory" />
          </figure>
          <span>{data.name}</span>
          <div className="btn editButton" onClick={() => EditCategoryClick()}>
            <i className="fa-solid fa-pen"></i>
          </div>
          <div
            className="showMoreButton"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <i className="fa-solid fa-angle-down"></i>
            ) : (
              <i className="fa-solid fa-angle-left"></i>
            )}
          </div>
        </div>
        <span className="subButton">-</span>
      </div>
      <div className="subCategoryItems">
        {showMore &&
          subCategories.map(
            (_data, index) =>
              data.id === _data.categoryId && (
                <SubCategory data={_data} key={index} />
              )
          )}
      </div>
    </div>
  );
}
