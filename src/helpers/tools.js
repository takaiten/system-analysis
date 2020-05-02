import { expert } from './consts';

export const isValidName = name => name && name.length > 1;

export const isValidPassword = password => password && password.length > 4;

export const isValidInput = value => /^[\w ]*$/.test(value);

export const findUserByNickname = ({ nickname }, usersByIds, usersIds) =>
  usersIds.find(userId => usersByIds[userId].nickname === nickname);

export const getFullName = ({ firstName, lastName }) =>
  firstName && lastName ? `${firstName} ${lastName}` : '';

export const filterExperts = (ids, users) =>
  ids.filter(userId => users[userId].role === expert).map(userId => users[userId]);

export const factorial = (() => {
  const cache = {};
  function fn(n) {
    if (n === 0) {
      return 1;
    }
    if (cache[n]) {
      return cache[n];
    }
    return (cache[n] = n * fn(n - 1));
  }
  return fn;
})();

export const combination = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
