import { axiosClient } from "./axiosClient";

export const APIGetUserOrder = (id) => {
  const url = `/order/user/${id}/1`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetOrderDetail = (orderId) => {
  const url = `/order/detail/${orderId}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIAddComment = (productId, comment, rating) => {
  const url = `users/products/${productId}/comments`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const dataComment = {
    comment,
    rating,
  };

  return axiosClient
    .post(url, dataComment, { headers: headers })
    .catch((err) => {
      console.log("Can't call API after 2 retries", err);
      return err;
    });
};

export const APIAddImageToComment = (commentId, image) => {
  const url = `users/comments/${commentId}/image`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "content-type": "multipart/form-data",
  };
  const data = new FormData();
  data.append("image", image);

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
export const APIGetAllOrder = (page = 1) => {
  const url = `/order/all/${page}`;
  return axiosClient.get(url).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
export const APICreateOrderWithCOD = (orderItems, address, phone, user_name, payment = "COD") => {
  const url = "/order/create_order";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const user_id = window.sessionStorage.getItem("id");

  const data = [
    orderItems,
    {
      user_id,
      payment,
      address,
      phone,
      user_name,
    },
  ];

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APICreateOrderWithVNPAY = (orderItems, address, phone, user_name, payment = "VNPAY") => {
  const url = "/vnpay/payment";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const user_id = window.sessionStorage.getItem("id");

  const data = [
    orderItems,
    {
      user_id,
      payment,
      address,
      phone,
      user_name,
    },
  ];

  console.log(data);

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIUpdateOrder = (OrderID, status) => {
  const url = `/order/update_order/${OrderID}`;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    status,
  };

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIConfirmOrder = (orderId) => {
  const url = `admin/payment/accept`;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    id: orderId,
  };

  return axiosClient.put(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APICancelOrder = (orderId) => {
  const url = `admin/payment/cancel`;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    id: orderId,
  };

  return axiosClient.put(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APICheckoutUpdateOrder = (orderId, status) => {
  const url = `payment/updateorder`;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    id: orderId,
    status,
  };

  return axiosClient.put(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });

}