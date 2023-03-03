import React from "react";
import "./CustomerInfoTable.scss";
import CustomerModal from "./CustomerModal/CustomerModal";

export default function CustomerInfoTable({ data }) {

  const [toggle, setToggle] = React.useState(false);


  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <React.Fragment>
      <div className="customer-info-table">
        <div className="customer-info-name">
          <figure className="customer-info-avatar">
            <img
              src={data.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GJoRJ64Qv4yF1e1CWg3LgtyCs-hG5-_Uiw&usqp=CAU"}
              alt="anh-nguoi-dung"
            ></img>
          </figure>
          <p>{data.name}</p>
        </div>
        <div className="customer-info-time">
          <p>{data.createdDate}</p>
        </div>
        <div className="customer-info-email">
          <p>{data.email}</p>
        </div>
        <div className="customer-info-icon">
          <button className="btn-edit" onClick={setToggle}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="btn-delete">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      {toggle && <CustomerModal
        data={data}
        onToggle={handleToggle} />}
    </React.Fragment>
  );
}
