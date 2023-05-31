  import { ADD_TO_CART } from "./cartActions";
import { useState } from "react";
  let initialState = {
    cartItems: [],
  };

  const cartReducer = (state = initialState, action) => {
        switch (action.type) {
      case ADD_TO_CART:
        console.log(state);

      default:
        return state;
    }
  };

  export default cartReducer;
