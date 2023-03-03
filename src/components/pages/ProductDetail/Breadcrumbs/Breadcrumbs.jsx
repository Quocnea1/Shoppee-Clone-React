import React from "react";
import "./Breadcrumbs.scss";
function Breadcrumbs(data) {
  const { category, subCategory, item } = data;
  return (
    <div className="breadcrumbs">
      <div className="container">
        <div className="wrapper">
          <a href="/">{category} </a> &gt; <a href="/">{subCategory}</a> &gt;{" "}
          <a href="/">{item}</a>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumbs;
