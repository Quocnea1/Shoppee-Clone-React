import "./RatingFormModal.scss";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  APIAddComment,
  APIAddImageToComment,
} from "../../../../../api/axios/orderAPI";
import PuffLoader from 'react-spinners/PuffLoader'

function RatingFormModal({ productId, name, setModal }) {
  const [imgPreview, setImgPreview] = useState();
  const [rateFailed, setRateFailed] = useState(false);

  const imgChoosen = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setFieldValue("image", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearImg = (setFieldValue) => {
    setFieldValue("image", "");
    setImgPreview(undefined);
  };

  const initialValues = {
    star: 5,
    comment: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    star: Yup.number(),
    comment: Yup.string().required("Nhận xét trống"),
    image: Yup.mixed(),
  });

  const onSubmit = async (fields) => {
    const resComment = await APIAddComment(
      productId,
      fields.comment,
      fields.star
    );
    if (resComment.status === 200) {
      if (fields.image) {
        await APIAddImageToComment(resComment.data.id, fields.image);
      }
      setModal(false);
    } else {
      setRateFailed(true);
    }
  };

  const loading = {
    margin: "0 2px",
  };

  return (
    <div className="ratingFormModal">
      <div className="modal">
        <div
          className="modalOverlay"
          onClick={() => {
            setModal(false);
          }}
        ></div>
        <div className="modalBody">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <>
                <Form>
                  <div className="title">{name}</div>
                  <div className="ratingStar">
                    <p>Đánh giá</p>
                    <ReactStars
                      count={5}
                      size={50}
                      color="#ebebeb"
                      activeColor="#ee4d2d"
                      classNames="star"
                      onChange={(e) => setFieldValue("star", e)}
                      value={5}
                    />
                    <Field name="star" className="invisible" readOnly />
                  </div>
                  <Field
                    name="comment"
                    as="textarea"
                    placeholder="Để lại lời đánh giá tại đây"
                    className="comment"
                  />
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="comment"
                  />
                  <div className="ratingImage">
                    <span>
                      <i>Thêm hình ảnh feedback cho sản phẩm</i>
                    </span>
                    <div className="inner">
                      <figure className="images imageAdd">
                        {values.image ? (
                          <img src={imgPreview} alt="preview" />
                        ) : (
                          <label htmlFor="addButton">+</label>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          id="addButton"
                          className="invisible"
                          onChange={(e) => imgChoosen(e, setFieldValue)}
                        />
                      </figure>
                    </div>
                    <div
                      className="clearImg"
                      onClick={() => clearImg(setFieldValue)}
                    >
                      xóa
                    </div>
                  </div>
                  <button type="submit" className="submit">
                    {isSubmitting ? <PuffLoader color="#ffffff" size={30} cssOverride={loading} /> : "gửi"}
                  </button>
                  {rateFailed && (
                    <div className="error">
                      Đánh giá lỗi, vui lòng thử lại sau
                    </div>
                  )}
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RatingFormModal;
