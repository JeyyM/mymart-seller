import React from 'react';

const MyContext = React.createContext();

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

const MyProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const sharedData = {
    handleIncrement,
    state,
  };

  return (
    <MyContext.Provider value={sharedData}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
