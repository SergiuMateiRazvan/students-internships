import {API_URL} from '../common';

export const getInternships = (filters, sort) => {
  const filterQuery = new URLSearchParams(filters);
  const sortQuery = new URLSearchParams(sort);
  const baseQuery = `${API_URL}/internship`;
  const query = `${baseQuery}/?${[filterQuery, sortQuery]
      .filter((a)=> a !='null=').join('&')}`;
  return fetch(query)
      .then((response) => response.json());
};


export const postInternship = (internshipPost) =>
  fetch(`${API_URL}/internship`, {
    method: 'POST',
    body: JSON.stringify(internshipPost),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

export const getInternshipViews = (internshipId) =>
  fetch(`${API_URL}/internship/view/${internshipId}/count/`)
      .then((response) =>response.json());

export const addInternshipView = (internshipId, userMail) =>
  fetch(`${API_URL}/internship/view/`, {
    method: 'POST',
    body: JSON.stringify({user_mail: userMail, internship_id: internshipId}),
  });
