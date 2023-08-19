  import { ADD_TO_CART } from "./cartActions";
  let initialState = {
    cartItems: [],
  };

  const cartReducer = (state = initialState, action) => {
        switch (action.type) {
      case ADD_TO_CART:

      default:
        return state;
    }
  };

  export default cartReducer;
