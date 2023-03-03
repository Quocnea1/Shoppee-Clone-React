import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { headerData } from "../../../../../utils/dataConfig";
import "./SideBar.scss";

export default function SideBar({
  setActiveIndex,
  activeIndex,
  sidebarNavItems,
}) {
  const { logoShopeePrimary } = headerData.images;

  useEffect(() => {
    const curPath = window.location.pathname.split("/admin")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => "/" + item.section === curPath
    );
    setActiveIndex(curPath.length <= 0 ? 0 : activeItem);
  }, [setActiveIndex, sidebarNavItems]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logoShopeePrimary} alt="logo" />
      </div>
      <div className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={() => {
              if(index === sidebarNavItems.length - 1){
                window.sessionStorage.clear();
              }
              setActiveIndex(index);
            }}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
