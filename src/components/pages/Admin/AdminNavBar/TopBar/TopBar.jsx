import React from "react";
import "./TopBar.scss";
import Avatar from "../../../../../assets/images/avatar.png";

export default function TopBar({ activeIndex, sidebarNavItems }) {
  return (
    <div className="topBar">
      <div className="wrapper">
        <div className="leftSection">
          <h1 className="title">{sidebarNavItems[activeIndex].display}</h1>
        </div>
        <div className="middleSection">
          <i className="fas fa-search icon"></i>
          <input type="text" className=" searchBar" placeholder="Tìm kiếm" />
        </div>
        <div className="rightSection">
          <img src={Avatar} alt="logo" className="avatar" />
        </div>
      </div>
    </div>
  );
}
