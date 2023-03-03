import React from "react";
import { ShortNumFormatter } from "../../../../../global/ProcessText/ProcessText";
import { topProductsWidgets } from "./../../../../../../utils/dataConfig";
import "./Widgets.scss";

export default function Widgets() {
  return (
    <>
      <div className="widget grid grid__row">
        {topProductsWidgets?.map((data, index) => {
          const lastItem = index === topProductsWidgets.length - 1;
          return (
            <div className="container grid__column-2-4" key={index}>
              <div
                className={lastItem ? "wrapper wrapper-last-child" : "wrapper"}
              >
                <img
                  className={lastItem ? "img-last-child" : ""}
                  src={data.img}
                  alt=""
                />
                <div className="name">
                  <h3 className={lastItem ? "h3-last-child" : ""}>
                    {data.name}
                  </h3>
                  <p
                    className={
                      index === topProductsWidgets.length - 1
                        ? "p-last-child"
                        : ""
                    }
                  >
                    {<ShortNumFormatter number={data.val} />}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
