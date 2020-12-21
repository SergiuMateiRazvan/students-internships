import {API_URL} from '../common';

export const getInternships = () =>
  fetch(`${API_URL}/internship/`)
      .then((response) => response.json());

export const getInternshipViews = (internshipId) =>
  fetch(`${API_URL}/internship/view/${internshipId}/count/`)
      .then((response) =>response.json());

export const addInternshipView = (internshipId, userMail) =>
  fetch(`${API_URL}/internship/view/`, {
    method: 'POST',
    body: JSON.stringify({user_mail: userMail, internship_id: internshipId}),
  });
