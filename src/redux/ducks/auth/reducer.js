import * as types from './types';

const initialState = {
  usersById: {},
  usersIds: [],
  user: null,
  isLoggedIn: false
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_USER:
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [payload.id]: payload
        },
        usersIds: [...state.usersIds, payload.id],
        user: payload,
        isLoggedIn: true
      };
    case types.LOGIN:
      return {
        ...state,
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
