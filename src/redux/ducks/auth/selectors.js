export const getLoggedState = state => state.auth.isLoggedIn;
export const getUsersByIds = state => state.auth.usersById;
export const getUsersIds = state => state.auth.usersIds;
export const getUser = state => state.auth?.user;
export const getUserRole = state => state.auth?.user?.role;
