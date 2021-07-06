export const read = (userId, token) => {
  return fetch(`http://localhost:8080/user/${userId}`, {
    //return is required because init is expecting something to get returned for it ro run read method
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
