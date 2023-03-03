import { axiosClient } from "./axiosClient";
export const APIAddToCart = (productId, quantity, type) => {
  const url = "/cart/add";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const userId = window.sessionStorage.getItem("id");
  const inCart = {
    productId,
    userId,
    quantity,
    type,
  };

  return axiosClient.post(url, inCart, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIUpdateCart = (productId, quantity, type) => {
  const url = "/cart/update";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const userId = window.sessionStorage.getItem("id");
  const updateCart = {
    productId,
    userId,
    quantity,
    type,
  };

  return axiosClient.put(url, updateCart, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIDeleteCart = (productId, type) => {
  const url = "/cart";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const deleteCart = {
    productId,
    type,
  };

  return axiosClient
    .delete(url, {
      headers: headers,
      data: deleteCart,
    })
    .catch((err) => {
      console.log("Can't call API after 2 retries", err);
      return err;
    });
};

export const APIGetAllCart = () => {
  const url = `/cart`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
