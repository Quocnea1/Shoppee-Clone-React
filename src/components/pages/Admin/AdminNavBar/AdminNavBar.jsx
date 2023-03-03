import React from "react";
import { useState } from "react";
import "./AdminNavBar.scss";
import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import "./AdminNavBar.scss";
import { sidebarNavItems } from "../../../../utils/dataConfig";

export default function AdminNavBar({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="adminNavBar">
      <SideBar
        sidebarNavItems={sidebarNavItems}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
      <div className="navBarContent">
        <TopBar sidebarNavItems={sidebarNavItems} activeIndex={activeIndex} />
        {children}
      </div>
    </div>
  );
}
