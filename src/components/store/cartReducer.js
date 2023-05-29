import { ADD_TO_CART } from "./cartactions";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
        console.log(state)

      const existingItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.name === action.payload.name
              ? { ...item, cartValue: item.cartValue + action.payload.cartValue }
              : item
          ),
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
