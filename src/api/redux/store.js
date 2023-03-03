import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./slices/collectionSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import adminReducer from "./slices/adminSlice";
import commentsReducer from "./slices/commentSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";

const rootReducer = {
  collection: collectionReducer,
  users: userReducer,
  carts: cartReducer,
  categories: categoryReducer,
  admin: adminReducer,
  comments: commentsReducer,
  forgotPassword: forgotPasswordReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
