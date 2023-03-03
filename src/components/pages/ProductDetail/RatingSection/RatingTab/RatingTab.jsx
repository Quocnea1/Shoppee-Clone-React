import React from "react";
import ReactStars from "react-rating-stars-component";
import "./RatingTab.scss";

const RatingTab = ({ data }) => {
  const altImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div className="shopee-product-rating">
      <div className="rating-avatar">
        <div className="avt-placeholder">
          <img
            src={data.avatar ? data.avatar : altImg}
            alt={data.username}
            className="avatar-img"
          />
        </div>
      </div>
      <div className="rating-main">
        <div className="author-name">{data.username}</div>
        <div className="rating-star">
          {
            <ReactStars
              key={Math.random()}
              count={5}
              size={23}
              color="#ebebeb"
              activeColor="#ee4d2d"
              classNames="star"
              edit={false}
              value={data.rating}
              isHalf={true}
            />
          }
        </div>
        <div className="rating-time">{data.createdOn}</div>
        <div className="comment">{data.comment}</div>
        <div className="img-wrapper">
          {data.image && (
            <figure className="image">
              <img src={data.image} alt="" />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingTab;
