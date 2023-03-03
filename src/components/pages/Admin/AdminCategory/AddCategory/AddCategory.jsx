import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddCategory.scss";
import {
  APIAddCategory,
  APIAddImageCategory,
  APIAddSubcategory,
  APIUpdateCategory,
  APIUpdateSubCategory,
} from "../../../../../api/axios/categoryAPI";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

export default function AddCategory({
  initialFormValues,
  setInitialFormValues,
  isEdit,
  setIsEdit,
}) {
  const [imgPreview, setImgPreview] = useState();

  const shopList = useSelector((state) => state.admin.allShop);

  const initialValues = initialFormValues;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên danh mục trống"),
    sub_category: Yup.array().of(
      Yup.string().required("Tên danh mục con trống")
    ),
    shopId: Yup.number().required("Chọn shop trống"),
    image: Yup.mixed().required("Hình ảnh trống"),
  });

  useEffect(() => {
    setImgPreview(initialFormValues.image);
  }, [initialFormValues]);

  const imageHandler = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setFieldValue("image", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const resetCategoryImage = (setFieldValue) => {
    setImgPreview(null);
    setFieldValue("image", null);
  };

  const resetFormValues = () => {
    setInitialFormValues({
      name: "",
      sub_category: [""],
      shopId: "",
      image: null,
    });
    setIsEdit(false);
  };

  const formatSubCategoryData = (subList) => {
    let temp = [];
    for (let i = 0; i < subList.length; i++) {
      temp.push({
        name: subList[i],
      });
    }
    return temp;
  };

  const addCategory = async (fields) => {
    const resAddCategory = await APIAddCategory(
      fields.name,
      Number(fields.shopId)
    );
    if (resAddCategory.status === 200) {
      const resAddSubCategory = await APIAddSubcategory(
        formatSubCategoryData(fields.sub_category, resAddCategory.data.id)
      );
      const resAddImageCategory = await APIAddImageCategory(
        resAddCategory.data.id,
        fields.image
      );

      if (
        resAddSubCategory.status === 200 &&
        resAddImageCategory.status === 200
      ) {
        alert("Thêm danh mục thành công");
      }
    }
  };

  const editCategory = async (fields) => {
    const resUpdateCategory = await APIUpdateCategory(
      fields.id,
      fields.name,
      fields.shopId
    );
    if (resUpdateCategory.status === 200) {
      const resUpdateSubCategory = await APIUpdateSubCategory(
        formatSubCategoryData(fields.sub_category),
        resUpdateCategory.data.id
      );
      if (typeof fields.image !== "string") {
        console.log("call update image api");
        const resUpdateImageCategory = await APIAddImageCategory(
          resUpdateCategory.data.id,
          fields.image
        );
      }
      if (resUpdateSubCategory.status === 200) {
        alert("Sửa danh mục thành công");
      }
    }
  };

  const onSubmit = async (fields) => {
    console.log("calling add category api");
    console.log(fields);
    if (!isEdit) {
      await addCategory(fields);
    } else {
      await editCategory(fields);
    }
  };

  return (
    <div className="addCategory">
      <div className="adminContainer">
        <div className="wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="adminCategoryForm">
                <div className="title">
                  {isEdit ? "Sửa danh mục" : "Thêm danh mục"}
                  <span className="changeAdd" onClick={() => resetFormValues()}>
                    Thêm
                  </span>
                </div>
                <div className="addNameCategory">
                  <label htmlFor="categoryName" className="label">
                    Tên danh mục
                  </label>
                  <Field name="name" id="categoryName" className="input" />
                  <ErrorMessage component="div" className="error" name="name" />
                </div>
                <div className="addImageCategory">
                  <span className="label">Thêm hình ảnh cho Danh Mục</span>
                  {imgPreview && (
                    <span
                      className="clearImage"
                      onClick={() => resetCategoryImage(setFieldValue)}
                    >
                      Xóa
                    </span>
                  )}
                  <label htmlFor="image" className="imageButton">
                    {imgPreview ? <img src={imgPreview} alt="" /> : "+"}
                  </label>
                  <input
                    name="image"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => imageHandler(e, setFieldValue)}
                    hidden
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error left"
                  />
                </div>
                <div className="addShop">
                  <label htmlFor="productSubCategory" className="label">
                    Tên Shop
                  </label>
                  <Field
                    name="shopId"
                    id="productSubCategory"
                    as="select"
                    className="input select"
                  >
                    <option value="">Tên Shop</option>
                    {shopList &&
                      shopList.map((data, index) => (
                        <option value={data.id} key={index}>
                          {data.name}
                        </option>
                      ))}
                  </Field>
                  <i className="fa-solid fa-angle-down"></i>
                  <ErrorMessage
                    name="shopId"
                    component="div"
                    className="error left"
                  />
                </div>
                <div className="addSubCategory">
                  <FieldArray name="sub_category">
                    {({ remove, push }) => (
                      <>
                        <div className="moreSubCategory">
                          <span className="label">Danh mục con</span>
                          <span className="subButton" onClick={() => push("")}>
                            +
                          </span>
                        </div>
                        <label className="label">Tên danh mục con</label>
                        {values.sub_category.length > 0 &&
                          values.sub_category.map((data, index) => (
                            <div className="subCategory" key={index}>
                              <Field
                                name={`sub_category.${index}`}
                                className="input"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`sub_category.${index}`}
                              />
                              <span
                                className="subButton"
                                onClick={() => remove(index)}
                              >
                                -
                              </span>
                            </div>
                          ))}
                      </>
                    )}
                  </FieldArray>
                </div>
                <button type="submit" className="btn saveButton">
                  {isSubmitting ? (
                    <PuffLoader size={30} color="#fff" />
                  ) : isEdit ? (
                    "Lưu"
                  ) : (
                    "Thêm"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
