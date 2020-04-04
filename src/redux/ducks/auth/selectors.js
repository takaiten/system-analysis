export const getLoggedState = state => state.auth.isLoggedIn;
export const getUsers = state => state.auth.users;
export const getUser = state => state.auth?.user;
export const getUserRole = state => state.auth?.user?.role;
