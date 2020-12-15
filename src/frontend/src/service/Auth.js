import {API_URL} from '../common';

export const register = (user) => {
  return fetch(`${API_URL}/register/`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((response) => response.json());
};
