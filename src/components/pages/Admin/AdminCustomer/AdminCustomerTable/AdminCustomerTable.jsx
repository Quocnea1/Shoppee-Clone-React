import React from "react";
import CustomerInfoTable from "./CustomerInfoTable/CustomerInfoTable";
import "./AdminCustomerTable.scss";
import {useSelector} from "react-redux";

export default function AdminCustomerTable() {

  const listCustomer = useSelector((state) => state.admin.allCustomers);
  return (
    <div className="adminCustomerTable">
      <div className="customerTable">
        <div className="customerTable-heading">
          <div className="name">Tên</div>
          <div className="time">Thời gian tạo</div>
          <div className="email">Email</div>
        </div>
        <div className="customerTable-info">
          {listCustomer.map((_data, index) => (
            <CustomerInfoTable data={_data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
