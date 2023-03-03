import React, { useEffect, useState } from "react";
import "./RatingSection.scss";
import RatingFilter from "./RatingSectionFilter/RatingFilter";
import ReactStars from "react-rating-stars-component";
import { rating } from "../../../../utils/dataConfig";
import RatingTab from "./RatingTab/RatingTab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { APIGetComments } from "../../../../api/axios/productAPI";
import { commentActions } from "../../../../api/redux/slices/commentSlice";

function RatingSection() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { rate } = rating;
  const [rateState, setRateState] = useState(0);
  const [noComment, setNoComment] = useState(false);

  const loadComments = async (rating) => {
    const res = await APIGetComments(location.state.productId, rating);
    if (res.status === 200) {
      const updateComment = commentActions.updateList({
        list: res.data.list,
        itemNumber: res.data.itemNumber,
      });
      dispatch(updateComment);
    } else if (res.response.status === 404) {
      const resetComment = commentActions.resetList();
      dispatch(resetComment);
      setNoComment(true);
    }
  };

  const handleFilter = (index, data) => {
    if (data === -1) loadComments();
    else loadComments(data);
    setRateState(index);
  };
  useEffect(() => {
    loadComments();
  }, []);

  const list = useSelector((state) => state.comments.list);
  const ratingValue = useSelector(
    (state) =>
      state.collection.list.find((m) => {
        return m.id === Number(location.state.productId);
      }),
    shallowEqual
  );

  return (
    <div className="RatingSection">
      <div className="container">
        <div className="wrapper">
          <h2>ĐÁNH GIÁ SẢN PHẨM</h2>
          <div className="rating-box">
            <div className="rating-box-star">
              <p className="avg">{ratingValue?.avgRating} trên 5 </p>
              {ratingValue?.avgRating && (
                <ReactStars
                  count={5}
                  size={20}
                  color="#ebebeb"
                  activeColor="#ee4d2d"
                  classNames="star"
                  edit={false}
                  value={ratingValue?.avgRating}
                  isHalf={true}
                />
              )}
            </div>
            <div className="rating-box-btn">
              {rate &&
                rate.map((data, index) => (
                  <RatingFilter
                    key={index}
                    data={data}
                    index={index}
                    rateState={rateState}
                    onChangeFilter={handleFilter}
                  />
                ))}
            </div>
          </div>
          {noComment ? (
            <div className="noComment">
              <i className="fa-solid fa-comment"></i>
              <span>Sản phẩm chưa có đánh giá nào</span>
            </div>
          ) : (
            <div className="rating-tab">
              {list.map((data, index) => (
                <RatingTab data={data} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RatingSection;
