import "./InfoField.scss";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  APIChangeAvatar,
  APIChangeProfile,
} from "../../../../../api/axios/customerAPI";
import MessageModal from "../../../../global/MessageModal/MessageModal";
import PuffLoader from "react-spinners/PuffLoader";

export default function InfoField() {
  const [previewImg, setPreviewImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.users);

  useEffect(() => {
    if (data.avatar) {
      setPreviewImg(data.avatar);
    }
  }, [data]);

  const initialValues = {
    name: data.name ? data.name : "",
    gender: data.gender ? data.gender : "1",
    dob: data.dob ? data.dob : "",
    avatar: data.avatar,
  };

  const validationSchema = Yup.object().shape({
    nameShop: Yup.string(),
    gender: Yup.number().max(3).min(1),
    dateBirth: Yup.date(),
    avatar: Yup.mixed(),
  });

  const imageHandler = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setFieldValue("avatar", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (fields) => {
    if (
      fields.name !== data.name ||
      fields.dob !== data.dob ||
      fields.gender !== data.gender ||
      fields.avatar !== data.avatar
    ) {
      console.log("calling change profile API");
      const resChangeProfile = await APIChangeProfile(
        fields.name,
        fields.dob,
        fields.gender
      );
      if (fields.avatar !== data.avatar) {
        console.log("calling change avatar API");
        const reschangeAvatar = await APIChangeAvatar(fields.avatar);
      }
      if (resChangeProfile.status === 200) {
        setModal(true);
      }
    }
  };

  return (
    <div className="customerInfofield">
      {modal && (
        <MessageModal
          message="Lưu thông tin thành công"
          type="success"
          setModal={setModal}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="formSection">
              <div className="border-right infoSection">
                <div className="form-group row">
                  <label
                    htmlFor="staticText"
                    className="col-sm-5 col-form-label title"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="col-sm-6">
                    <span className="form-control-plaintext myFieldReadOnly">
                      {data.username}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticName"
                    className="col-sm-5 col-form-label title"
                  >
                    Tên
                  </label>
                  <div className="col-sm-6">
                    <Field
                      type="text"
                      className="form-control-plaintext myField"
                      id="staticName"
                      name="name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-5 col-form-label title"
                  >
                    Email
                  </label>
                  <div className="col-sm-6">
                    <span className="form-control-plaintext myFieldReadOnly">
                      {data.email}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticPhoneNumber"
                    className="col-sm-5 col-form-label title"
                  >
                    Số điện thoại
                  </label>
                  <div className="col-sm-6">
                    <span className="form-control-plaintext myFieldReadOnly">
                      {data.phone}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label title">
                    Giới tính
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-check-inline checkRadio">
                      <div className="gender">
                        <Field
                          className="form-check-input"
                          id="male"
                          type="radio"
                          value="1"
                          name="gender"
                        />
                        <label
                          className="form-check-label label"
                          htmlFor="male"
                        >
                          Nam
                        </label>
                      </div>
                      <div className="gender">
                        <Field
                          className="form-check-input"
                          id="female"
                          type="radio"
                          value="2"
                          name="gender"
                        />
                        <label
                          className="form-check-label label"
                          htmlFor="female"
                        >
                          Nữ
                        </label>
                      </div>
                      <div className="gender">
                        <Field
                          className="form-check-input"
                          id="other"
                          type="radio"
                          value="3"
                          name="gender"
                        />
                        <label
                          className="form-check-label label"
                          htmlFor="other"
                        >
                          Khác
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticDateBirth"
                    className="col-sm-5 col-form-label title"
                  >
                    Ngày sinh
                  </label>
                  <div className="col-sm-3">
                    <Field
                      type="date"
                      name="dob"
                      className="form-control-plaintext"
                      id="dateBirth"
                    />
                  </div>
                </div>
              </div>
              <div className="imageUploaderForm">
                <div className="imageUploaderSection">
                  <div className="imgWrapper">
                    <figure className="imageContainer">
                      <img
                        src={previewImg}
                        alt="avatar"
                        id="img"
                        className="img"
                      />
                    </figure>
                    <label htmlFor="input" className="custom-file-upload">
                      Upload Ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="imageBtn"
                      id="input"
                      onChange={(e) => imageHandler(e, setFieldValue)}
                    />
                  </div>
                </div>
                <p className="underText"> Dụng lượng file tối đa 10MB</p>
                <p className="underText"> Định dạng: .JEG,.PNG</p>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3" />
              <div className="col-sm-6">
                <button className="buttonSave" type="submit">
                  {isSubmitting ? (
                    <PuffLoader
                      color="#ffffff"
                      size={30}
                    />
                  ) : (
                    "Lưu"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
