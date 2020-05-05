import { List } from 'immutable';

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

export const flatMatrix = n => List().setSize(n * n);

export const flatIdentityMatrix = n => flatMatrix(n).map((_, index) => (index % (n + 1) === 0 ? 1 : 0));
