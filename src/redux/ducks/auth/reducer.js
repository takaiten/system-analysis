import * as types from './types';

const initialState = {
  users: [],
  user: null,
  isLoggedIn: false
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
        user: payload,
        isLoggedIn: true
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export { authReducer };
