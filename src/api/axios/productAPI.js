import { axiosClient } from "./axiosClient";

export const APIGetProducts = (page, limit) => {
  const url = "/products";
  const params = {
    page: page,
    limit: limit,
  };
  return axiosClient
    .get(url, { params })
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetProductInfo = (id = 34) => {
  const url = `/products/${id}`;
  return axiosClient.get(url).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetProductType = (id) => {
  const url = `/products/${id}/types`;

  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIAddProductInfo = ({
  name,
  description,
  detail,
  subCategoryId,
}) => {
  const url = "admin/products";

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const productInfo = {
    name,
    description,
    detail,
    subCategoryId,
  };

  return axiosClient.post(url, productInfo, { headers: headers });
};

export const APIAddProductType = (types, id) => {
  const url = `admin/products/${id}/types`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.post(url, types, { headers: headers });
};

export const APIAddProductImage = (
  imageProduct,
  image1,
  image2,
  image3,
  image4,
  id
) => {
  const url = `/admin/products/${id}/image`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "content-type": "multipart/form-data",
  };

  const data = new FormData();
  data.append("imageProduct", imageProduct);
  data.append("image1", image1);
  data.append("image2", image2);
  data.append("image3", image3);
  data.append("image4", image4);

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIUpdateProductInfo = ({
  id,
  name,
  description,
  detail,
  subCategoryId,
}) => {
  const url = `admin/products/${id}`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const productInfo = {
    name,
    description,
    detail,
    subCategoryId,
  };

  return axiosClient.put(url, productInfo, { headers: headers });
};

export const APIUpdateProductType = (types, id) => {
  const url = `admin/products/${id}/types`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  return axiosClient.put(url, types, { headers: headers });
};

export const APIUpdateProductImage = (
  imageProduct,
  image1,
  image2,
  image3,
  image4,
  id
) => {
  const url = `/admin/products/${id}/image`;

  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "content-type": "multipart/form-data",
  };

  const data = new FormData();
  if (typeof imageProduct != "string") {
    data.append("imageProduct", imageProduct);
  }
  if (typeof image1 != "string") {
    data.append("image1", image1);
  }
  if (typeof image2 != "string") {
    data.append("image2", image2);
  }
  if (typeof image3 != "string") {
    data.append("image3", image3);
  }
  if (typeof image4 != "string") {
    data.append("image4", image4);
  }

  return axiosClient.post(url, data, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APIGetComments = (id, rating, page = 1, limit = 10) => {
  const url = `/products/${id}/comments`;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const params = {
    page,
    limit,
    rating,
  };
  return axiosClient.get(url, { params }, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
export const APIOrderProduct = () => {
  const url = "/cart";
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  return axiosClient.get(url, { headers: headers }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};

export const APISearchProduct = ({
  keyword,
  page,
  limit,
  minPrice,
  maxPrice,
  sub,
  cat,
}) => {
  const url = "/products/search";
  const params = {
    keyword,
    page,
    limit,
    minPrice,
    maxPrice,
    sub,
    cat,
  };
  return axiosClient.get(url, { params }).catch((err) => {
    console.log("Can't call API after 2 retries", err);
    return err;
  });
};
