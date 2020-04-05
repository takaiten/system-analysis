export const isValidName = name => name && name.length > 1;
export const isValidPassword = password => password && password.length > 4;
export const isValidInput = value => /^[\w ]*$/.test(value);
export const findUserByNickname = ({ nickname }, usersByIds, usersIds) =>
  usersIds.find(userId => usersByIds[userId].nickname === nickname);
export const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
