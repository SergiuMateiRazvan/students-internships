import {API_URL} from '../common';

export const getUser = (mail) =>
  fetch(`${API_URL}/user/${mail}/`)
      .then((response) => response.json());

export const getUserDetails = (mail) =>
  fetch(`${API_URL}/user/details/${mail}/`);

export const addUserDetails = (userDetails) =>
  fetch(`${API_URL}/user/details/`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((response) => response.status === 404 || response.status === 400 ?
    updateUserDetails(userDetails):
       response.json());


export const updateUserDetails = (userDetails) => {
  const mail = userDetails.user_mail;
  delete userDetails.user_mail;
  if (Object.keys(userDetails.education).length === 0) {
    delete userDetails.education;
  }
  if (userDetails.name.length === 0) {
    delete userDetails.name;
  }
  if (userDetails.description.length === 0) {
    delete userDetails.description;
  }
  if (userDetails.phone.length === 0) {
    delete userDetails.phone;
  }


  return fetch(`${API_URL}/user/details/${mail}/`, {
    method: 'PATCH',
    body: JSON.stringify(userDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
