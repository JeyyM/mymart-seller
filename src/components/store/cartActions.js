export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (prod) => {
  return {
    type: ADD_TO_CART,
    payload: prod,
  };
};