const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        username: payload.username,
        imageUrl: payload.imageUrl,
      };
    default:
      return { ...state };
  }
};

export default Reducer;
