const API_URL = 'http://0.0.0.0:5005'

export const getStudents = () => fetch(`${API_URL}/api/students-descriptions/`)
  .then(response => response.json());


export const deleteDescription = (studentMail, description) => fetch(`${API_URL}/api/students-descriptions/${studentMail}/`, {
  method: 'DELETE',
  body: JSON.stringify({description}),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': "application/json",
  },
}).then(response => response.json());

