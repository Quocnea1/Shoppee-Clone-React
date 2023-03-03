import { axiosClient } from "./axiosClient";

export const APIGetRevenueOfYear = () => {
    const url = "admin/statistic/year";
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
      .get(url, { headers: headers })
      .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetTotalRevenueOfYear = () => {
  const url = "admin/statistic/reveune";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  return axiosClient
    .get(url, { headers: headers })
    .catch((err) => console.log("Can't call API after 2 retries", err));
};