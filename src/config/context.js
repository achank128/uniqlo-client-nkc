import React, { useEffect, useReducer } from "react";
import reducer from "./reducer";
import { actionTypes } from "./actionTypes";

const AppContext = React.createContext();
const initialState = {
  currentUser: null,
  wishList: [],
  cart: [],
  amount: 0,
  shippingFee: 30000,
  subtotal: 0,
  total: 0,
  search: "",
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formater = Intl.NumberFormat("de-DE");

  const addToWishList = (item) => {
    dispatch({ type: actionTypes.ADD_TO_WISH_LIST, payload: { item } });
  };

  const removeFromWishList = (id) => {
    dispatch({ type: actionTypes.REMOVE_FROM_WISH_LIST, payload: id });
  };

  const addToCart = (item, size, color, quantity) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: { item, size, color, quantity },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: actionTypes.REMOVE_ITEM, payload: id });
  };

  const increase = (id) => {
    dispatch({ type: actionTypes.INCREASE, payload: id });
  };

  const setQuantity = (id, quantity) => {
    dispatch({ type: actionTypes.SET_QUANTITY, payload: { id, quantity } });
  };

  const checkout = () => {
    dispatch({ type: actionTypes.CHECKOUT });
  };

  const setSearch = (searchText) => {
    dispatch({ type: actionTypes.SEARCH, payload: searchText });
  };

  const setCurrentUser = (user) => {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  useEffect(() => {
    //set cart from loccalStrorage
    const lsCart = localStorage.getItem("cart");
    if (lsCart) {
      const foundCart = JSON.parse(lsCart);
      dispatch({ type: actionTypes.SET_CART, payload: foundCart });
    }
    //set wishList from loccalStrorage
    const lsWishList = localStorage.getItem("wishList");
    if (lsWishList) {
      const foundWishList = JSON.parse(lsWishList);
      dispatch({ type: actionTypes.SET_WISH_LIST, payload: foundWishList });
    }
    //set user from loccalStrorage
    const lsUser = localStorage.getItem("currentUser");
    if (lsUser) {
      const foundUser = JSON.parse(lsUser);
      dispatch({ type: actionTypes.SET_CURRENT_USER, payload: foundUser });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: actionTypes.GET_TOTALS });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        formater,
        addToWishList,
        removeFromWishList,
        addToCart,
        removeItem,
        increase,
        setQuantity,
        checkout,
        setSearch,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
