import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  username: null,
  imageUrl: null,
  user: null,
  contract: null,
  accounts: null,
  email: null,
  userList: null,
  addressList: null,
};

const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);

export default Store;
