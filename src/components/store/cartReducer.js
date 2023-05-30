  import { ADD_TO_CART } from "./cartActions";
import { useState } from "react";
  let initialState = {
    cartItems: [],
  };

  const cartReducer = (state = initialState, action) => {
        switch (action.type) {
      case ADD_TO_CART:
        console.log(state);
        const router = action.payload.router
        const localStorageKey = `mart_${router}`

        const storedCartItems = localStorage.getItem(localStorageKey);
        const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];


        const existingItem = state.cartItems.find(
          (item) => item.name === action.payload.name
        );

        if (action.payload.cartValue === 0  || action.payload.cartValue === "") {
          return state;
        } else if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
              if (cartItem.name === action.payload.name) {
                const newCartValue = cartItem.cartValue + action.payload.cartValue;
                const cartValue =
                  newCartValue <= action.payload.amount
                    ? newCartValue
                    : action.payload.amount;
        
                return { ...cartItem, cartValue };
              }
              return cartItem;
            }),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
          };
        }
      default:
        return state;
    }
  };

  export default cartReducer;
