export const isValidName = name => name && name.length > 1;
export const isValidPassword = password => password && password.length > 4;
export const isValidInput = value => /^[\w ]*$/.test(value);
export const findUser = ({ nickname }, users) => users.find(user => user.nickname === nickname);
