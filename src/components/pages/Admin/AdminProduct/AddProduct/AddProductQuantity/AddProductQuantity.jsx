import { Field, ErrorMessage } from "formik";
import React from "react";

export default function AddProductQuantity({ index, values, setFieldValue }) {
  return (
    <div className="addQuantity">
      <div className="quantity">
        <span
          onClick={() => {
            if (values.types[index].quantity > 1)
              setFieldValue(
                `types.${index}.quantity`,
                values.types[index].quantity - 1
              );
          }}
          className="down"
        >
          -
        </span>
        <Field
          name={`types.${index}.quantity`}
          type="number"
          className="number"
        />
        <span
          onClick={() => {
            setFieldValue(
              `types.${index}.quantity`,
              values.types[index].quantity + 1
            );
          }}
          className="up"
        >
          +
        </span>
      </div>
      <ErrorMessage
        name={`types.${index}.quantity`}
        component="div"
        className="error"
      />
    </div>
  );
}
