import { Field, ErrorMessage } from "formik";
import React from "react";

export default function SubTypeField({
  type = "text",
  name,
  className = "input",
  placeholder = "",
  as = "",
  id = ""
}) {
  return (
    <div className="subTypeInner">
      <Field
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        as={as}
        id={id}
      />
      <ErrorMessage
        component="div"
        name={name}
        className="error"
      />
    </div>
  );
}
