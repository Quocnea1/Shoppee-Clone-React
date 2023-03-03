import "./Products.scss";
import {
  ProcessLongText,
  TextToCurrency,
} from "../../../../../global/ProcessText/ProcessText";
import Stars from "./Stars/Stars.jsx";
import { useState } from "react";
import { APIGetProductType } from "../../../../../../api/axios/productAPI";

export default function Product({ typeLabel, data, setInitialFormValues, setIsAddProduct }) {
  const [showMore, setShowMore] = useState(false);
  const [types, setTypes] = useState();

  const handleShowmore = async () => {
    if (!showMore) {
      const resLoadTypes = await APIGetProductType(data.id);
      if (resLoadTypes.status === 200) setTypes(resLoadTypes.data);
    }
    setShowMore(!showMore);
  };

  const handleEditProduct = async () => {
    const resLoadTypes = await APIGetProductType(data.id);
    if (resLoadTypes.status === 200) {
      setInitialFormValues({
        id: data.id,
        name: data.name,
        types: resLoadTypes.data,
        imageProduct: data.imageProduct,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        image4: data.image4,
        detail: data.detail || "",
        describe: data.description || "",
        subCategoryId: data.subCategoryId,
      });
      setIsAddProduct(false)
    }

    // setModal(true)
  };

  return (
    <div className="allProductLine">
      <div className="allProductContent">
        <figure className="productItemImg">
          <img src={data.imageProduct} alt="San pham cua ban" />
        </figure>
        <h3 className="productItemTitle">
          {<ProcessLongText string={data.name} limit={50} />}
          <br />
        </h3>
        <div className="productItemStars">
          <Stars n={data.avgRating} />
        </div>
        <button className="btn editButton" onClick={() => handleEditProduct()}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <div className="btn showMoreButton" onClick={() => handleShowmore()}>
          {showMore ? (
            <i className="fa-solid fa-angle-down down"></i>
          ) : (
            <i className="fa-solid fa-angle-left left"></i>
          )}
        </div>
      </div>
      {showMore && (
        <div className="showMore">
          <div className="typeLabel">
            {typeLabel.map((_data, index) => (
              <div className="label" key={index}>
                {_data}
              </div>
            ))}
          </div>
          <div className="typeContent">
            {types &&
              types.map((_data, index) => (
                <div key={index}>
                  <span className="">{_data.type}</span>
                  <span className="">
                    {<TextToCurrency number={_data.price} />}
                  </span>
                  <span className="">{_data.quantity}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
