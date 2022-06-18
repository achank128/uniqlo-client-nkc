import "./app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/wishList/WishList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";
import Error from "./pages/Error";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/product-list/:category" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
