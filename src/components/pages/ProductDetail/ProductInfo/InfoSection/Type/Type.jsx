import React from "react";
import "./Type.scss";

export default function Type({ data, setCurrentTypeIndex, index, selected }) {
  return (
    <div className="type">
      <button
        onClick={() => setCurrentTypeIndex(index)}
        type="button"
        className={`buttonType ${selected ? "selected" : ""}`}
      >
        {data.type}
      </button>
    </div>
  );
}
