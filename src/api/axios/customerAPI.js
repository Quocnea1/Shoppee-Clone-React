import { axiosClient } from "./axiosClient";

export const APILogin = (username, password) => {
  const url = "/login";
  const userData = {
    username: username,
    password: password,
  };
  return axiosClient.post(url, userData).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetOTP = (email) => {
  const url = "/recoveryPassword/getOtp";
  const params = {
    email,
  };
  return axiosClient.get(url, { params }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APISetNewPassword = (email, password) => {
  const url = `/recoveryPassword/recovery/${email}`;
  const data = {
    password,
  };
  return axiosClient.put(url, data).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIMyProfile = () => {
  const url = "/user/myProfile";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIChangeProfile = (name, dob, gender) => {
  const url = "/user/changeProfile";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const dataUser = {
    name,
    dob,
    gender,
  };

  return axiosClient.put(url, dataUser, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIChangeAvatar = (pic) => {
  const url = "/user/avatar";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "content-type": "multipart/form-data",
  };

  const data = new FormData();
  data.append("avatar", pic);

  return axiosClient.post(url, data, { headers: headers });
};

export const APIAdminCustomer = () => {
  const url = "/admin/users";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIAddAddress = ({
  address,
  name,
  phone,
  city,
  district,
  ward,
}) => {
  const url = "/user/address";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const dataUser = {
    address,
    name,
    phone,
    city,
    district,
    ward,
  };

  return axiosClient.post(url, dataUser, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIEditAddress = ({
  address,
  name,
  phone,
  city,
  district,
  ward,
  id,
}) => {
  const url = `/user/address/${id}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const dataUser = {
    address,
    name,
    phone,
    city,
    district,
    ward,
  };

  return axiosClient.put(url, dataUser, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APISetDefaultAddress = (id) => {
  const url = `/user/address/setDefault/${id}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.put(url, null, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIDeleteAddress = (id) => {
  const url = `/user/address/${id}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.delete(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIRegister = (password, username, phone, email) => {
  const url = "/register";
  const data = {
    password,
    username,
    phone,
    email,
  };
  return axiosClient.post(url, data).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIVerifyEmail = (email, username) => {
  const url = "/checkEmail/getOtp";

  const params = {
    email,
    username,
  };

  return axiosClient.get(url, { params }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
