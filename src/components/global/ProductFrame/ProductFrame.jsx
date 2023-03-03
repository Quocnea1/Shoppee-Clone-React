import { ProcessLongText, TextToCurrency } from "../ProcessText/ProcessText";
import { useNavigate } from "react-router-dom";
import "./ProductFrame.scss";
import ReactStars from "react-rating-stars-component";
import { ShortNumFormatter } from "../ProcessText/ProcessText";

export const ProductFrame = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${String(data.name).trim().replaceAll('/', ' ').replace(/\s/g, '-')}`, {
      state: {
        productId: data.id,
      },
    });
  };

  return (
    <div className="productFrame" onClick={() => handleClick()}>
      <figure className="productImg">
        <img src={data.imageProduct} alt={data.name}></img>
      </figure>
      <div className="productInfo">
        <div className="productTitle">
          <ProcessLongText string={data.name} />
        </div>
        <div className="productStar">
          <ReactStars
            key={data.id}
            value={data.avgRating}
            edit={false}
            isHalf={true}
            size={20}
            color="#ebebeb"
            activeColor="#ffce3d"
            className="star"
          />
          <div className="sold">
            Đã bán {<ShortNumFormatter number={data.sold} />}
          </div>
        </div>
        <div className="productPrice">
          <TextToCurrency number={data.price} />
        </div>
      </div>
      <div className="favouriteTag">
        <i className="fa-solid fa-check"></i>
        <span>Yêu thích</span>
      </div>
    </div>
  );
};
