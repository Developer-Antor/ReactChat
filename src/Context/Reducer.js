export const initialState = {
  user: null,
  username: null,
};

export const actionType = {
  SET_USER: "SET_USER",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};
