import React, { useEffect } from 'react'
import Chart from './Chart/Chart'
import TopProduct from './TopProduct/TopProduct'
import './AdminDashBoard.scss'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APIGetProducts } from '../../../../api/axios/productAPI';
import { APIGetRevenueOfYear, APIGetTotalRevenueOfYear } from '../../../../api/axios/statisticsAPI';
import { adminActions } from '../../../../api/redux/slices/adminSlice';

export default function AdminDashBoard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTopProduct = (allProduct) => {
    const listTopProduct = allProduct.list.sort((a, b) => b.sold - a.sold);
    return listTopProduct.slice(0, 5);
  };

  const loadData = async () => {
    console.log("calling admin api dashboard");
    const resAllProduct = await APIGetProducts(1, 5000);
    const resRevenueOfYear = await APIGetRevenueOfYear();
    const resTotalRevenueOfYear = await APIGetTotalRevenueOfYear();

    const updateTopProductAction = adminActions.updateTopProducts(
      calculateTopProduct(resAllProduct.data)
    );
    const updateRevenueOfYear = adminActions.updateRevenueOfYear([
      resRevenueOfYear.data["Month 1"],
      resRevenueOfYear.data["Month 2"],
      resRevenueOfYear.data["Month 3"],
      resRevenueOfYear.data["Month 4"],
      resRevenueOfYear.data["Month 5"],
      resRevenueOfYear.data["Month 6"],
      resRevenueOfYear.data["Month 7"],
      resRevenueOfYear.data["Month 8"],
      resRevenueOfYear.data["Month 9"],
      resRevenueOfYear.data["Month 10"],
      resRevenueOfYear.data["Month 11"],
      resRevenueOfYear.data["Month 12"],
    ]);
    const updateTotalRevenue = adminActions.updateTotalRevenue(
      resTotalRevenueOfYear.data
    );
    
    dispatch(updateTopProductAction);
    dispatch(updateRevenueOfYear);
    dispatch(updateTotalRevenue);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("role") === "ROLE_ADMIN") loadData();
    else if (window.sessionStorage.getItem("role") === "ROLE_USER")
      navigate("/");
    else navigate("/login");
  },[])

  return (
    <div className="adminDashBoard">
      <Chart />
      <TopProduct />
    </div>
  )
}
