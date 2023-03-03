import React from "react";

export default function ImageField({
  setFieldValue,
  className = "imgItem",
  imgPreview,
  imgChoosen,
  name,
}) {
  return (
    <>
      {(imgPreview[name] !== null && imgPreview[name] !== "-1" && imgPreview[name] !== "") ? (
        <figure className={className + " choosen"}>
          <img src={imgPreview[name]} alt="imageProduct" />
        </figure>
      ) : (
        <label htmlFor={name} className={className}>
          +
        </label>
      )}
      <input
        type="file"
        name={name}
        id={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => imgChoosen(e, setFieldValue, name)}
      />
    </>
  );
}
