import "./Header.scss";
import { headerData, limitProductCollection } from "../../../utils/dataConfig";
import { SearchRecommend } from "./SearchRecommend/SearchRecommend";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import NotLoggedIn from "./NotLoggedIn/NotLoggedIn";
import LoggedIn from "./LoggedIn/LoggedIn";
import MessageModal from "../../global/MessageModal/MessageModal";
import { useDispatch, useSelector } from "react-redux";
import { APIGetAllCart } from "../../../api/axios/cartAPI";
import { cartActions } from "../../../api/redux/slices/cartSlice";
import { debounce } from "lodash";
import { APISearchProduct } from "../../../api/axios/productAPI";
import { collectionActions } from "../../../api/redux/slices/collectionSlice";

export const Header = () => {
  const { ggPlay, appStore, qrCode, logoShopee } = headerData.images;

  const [fixed, setFixed] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchRecom, setRearchRecom] = useState([]);

  const [keyword, setKeyword] = useState(null);

  const login = window.sessionStorage.getItem("jwt");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categories.list);
  const cartCount = useSelector((state) => state.carts.list.length);

  const handleSearch = async () => {
    navigate(`/collection/search/${keyword}`, {
      state: {
        keyword: keyword,
      },
    });
  };

  const debounceDropDown = useCallback(
    debounce((nextValue) => loadCollection(nextValue), 1000),
    []
  );

  const loadCollection = async (keyword) => {
    console.log("calling api get product in search header");
    if (keyword !== "") {
      const res = await APISearchProduct({
        keyword: keyword,
      });
      if (res.status === 200) {
        setRearchRecom(res.data.list);
        const productSectionAction = collectionActions.updateList({
          list: res.data.list,
          currentPage: 1,
          itemCount: res.data.itemsNumber,
          limit: limitProductCollection,
        });
        dispatch(productSectionAction);
      }
    } else setRearchRecom([]);
  };

  const handleSearchDropdown = (e) => {
    setKeyword(e.target.value);
    debounceDropDown(e.target.value);
  };

  const SearchDropdownClick = (data) => {
    setRearchRecom([]);
    navigate(
      `/product/${String(data.name)
        .trim()
        .replaceAll("/", " ")
        .replace(/\s/g, "-")}`,
      {
        state: {
          productId: data.id,
        },
      }
    );
  };

  const handleClickCart = () => {
    navigate("/cart");
  };

  const loadCart = async () => {
    console.log("Calling api get cart");
    const resGetCart = await APIGetAllCart();
    if (resGetCart?.status === 200) {
      const updateCartAction = cartActions.updateCartList(resGetCart.data);
      dispatch(updateCartAction);
    }
  };

  useEffect(() => {
    if (cartCount <= 0) loadCart();
  }, [cartCount]);

  useEffect(() => {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    window.addEventListener("load", (e) => {
      if (window.pageYOffset <= 120) {
        setFixed(false);
      } else if (height > 1200) setFixed(true);
    });
    window.addEventListener("scroll", () => {
      if (window.pageYOffset <= 120) {
        setFixed(false);
      } else if (height > 1200) setFixed(true);
    });
  }, [fixed]);

  return (
    <div className={fixed ? "header fixed" : "header"}>
      <div className="container">
        {modal && (
          <MessageModal
            message={`Không tìm thấy sản phẩm với từ khóa "${keyword}"`}
            type={"error"}
            setModal={setModal}
          />
        )}
        <nav className="header__navbar">
          <ul className="header__nav__list">
            <li className="header__nav__item header__nav__item__has-qr header__nav__item--sparatest">
              Welcome to Shopee
              <div className="header__qr">
                <img src={qrCode} alt="QR Code" className="header__qr__img" />
                <div className="header__qr-apps">
                  <a href="/" className="header__qr__link">
                    <img
                      src={ggPlay}
                      alt="Googleplay"
                      className="header__qr-download-img"
                    />
                  </a>
                  <a href="/" className="header__qr__link">
                    <img
                      src={appStore}
                      alt="Appstore"
                      className="header__qr-download-img"
                    />
                  </a>
                </div>
              </div>
            </li>
            <li className="header__nav__item">
              <span className="header__nav__title--nopoiter">Kết nối</span>
              <a href="/" className="header__navbar__icon__link">
                <i className=" header__navbar__ico fa-brands fa-facebook"></i>
              </a>
              <a href="/" className="header__navbar__icon__link">
                <i className=" header__navbar__ico fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
          <ul className="header__nav__list">
            <li className="header__nav__item">
              <a href="/" className="header__nav__item__link">
                <i className=" header__navbar__ico fa-solid fa-circle-question"></i>
                Hỗ trợ
              </a>
            </li>
            <li className="header__nav__item">
              <a href="/" className="header__nav__item__link">
                <i className="header__navbar__ico fa-solid fa-globe"></i>
                Tiếng Việt
                <i className="header__navbar__ico fa-solid fa-angle-down"></i>
              </a>
              <div className="header__language">
                <a href="/" className="header__language-item">
                  Tiếng Anh
                </a>
                <a href="/" className="header__language-item">
                  Tiếng Việt
                </a>
              </div>
            </li>
            {login ? <LoggedIn /> : <NotLoggedIn />}
          </ul>
        </nav>
        {/* Begin header nav search */}
        <div className="header-with-search">
          <div className="header__logo">
            <img
              src={logoShopee}
              alt="logo"
              className="header__logo-img"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="header__search">
            <div className="header__search-input-wrap">
              <div className="header__search-input-inner">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Tìm kiếm sản phẩm"
                  onChange={handleSearchDropdown}
                />
                {searchRecom.length > 0 && (
                  <ul className="hearder__search__recom_dropdown">
                    {searchRecom.map((data, index) => {
                      if (index < 6)
                        return (
                          <li
                            key={index}
                            onClick={() => SearchDropdownClick(data)}
                          >
                            {data.name}
                          </li>
                        );
                    })}
                  </ul>
                )}
              </div>
              <div className="header__search__recom">
                {categoryList.length > 0 &&
                  categoryList.map(
                    (data, index) =>
                      index < 5 && <SearchRecommend data={data} key={index} />
                  )}
              </div>
            </div>
            <button
              className="header__search-btn"
              onClick={() => handleSearch()}
            >
              <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="header__cart">
            <div className="header__cart-wrap">
              <i
                className="header__cart-img fa-solid fa-cart-shopping"
                onClick={() => handleClickCart()}
              >
                {cartCount > 0 && (
                  <span className="cart__counter">{cartCount}</span>
                )}
              </i>
            </div>
          </div>
        </div>
        {/* End header nav search */}
      </div>
    </div>
  );
};
