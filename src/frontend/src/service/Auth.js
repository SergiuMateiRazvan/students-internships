import {API_URL} from '../common';

export const register = (user) => {
  return fetch(`${API_URL}/user/`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const login = (user) => {
  return fetch(`${API_URL}/user/auth/`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
