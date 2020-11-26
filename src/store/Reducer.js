const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        username: payload.username,
        imageUrl: payload.imageUrl,
        email: payload.email,
      };
    case "USER":
      return {
        ...state,
        user: payload,
      };
    case "CONTRACT":
      return {
        ...state,
        contract: payload.instance,
        accounts: payload.accounts,
      };

    case "USERS":
      return {
        ...state,
        userList: payload.users,
        addressList: payload.address,
      };
    case "TYPE":
      return {
        ...state,
        type: payload,
      };
    default:
      return state;
  }
};

export default Reducer;
