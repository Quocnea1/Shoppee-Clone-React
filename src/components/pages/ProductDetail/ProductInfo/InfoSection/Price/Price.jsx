import React from "react";
import { TextToCurrency } from "../../../../../global/ProcessText/ProcessText";
import "./Price.scss";

export default function Price({ data }) {
  return (
    <div className="price">
      <span>
        <TextToCurrency number={data.price} />
      </span>
    </div>
  );
}
