import { axiosClient } from "./axiosClient";

export const APIGetAllSubCategory = () => {
  const url = "/subcategory/get-all/";
  return axiosClient.get(url);
};
export const APILoadSubCategoryByCategoryId = (id = 4) => {
  const url = "/subcategory/get";

  const params = {
    categoryId: id,
  };

  return axiosClient.get(url, { params }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetAllCategory = () => {
  const url = "/category/get-all?sort=desc";
  return axiosClient.get(url);
};

export const APIAddCategory = (name, shopId) => {
  const url = "/admin/category";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    name,
    shopId,
  };
  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIAddSubcategory = (data) => {
  const url = "/admin/subcategory";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIAddImageCategory = (id, image) => {
  const url = `/admin/category/${id}/image`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "content-type": "multipart/form-data",
  };

  const data = new FormData();
  if (typeof image !== "string") {
    console.log("in if");
    data.append("image", image);
  }

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetAllShop = () => {
  const url = "/shop/get-all";

  return axiosClient.get(url).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIUpdateCategory = (id, name, shopId) => {
  const url = `/admin/category/${id}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const data = {
    name,
    shopId,
  };

  return axiosClient.put(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIUpdateSubCategory = (data, catId) => {
  const url = `/admin/category/${catId}/subcategory`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.put(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
