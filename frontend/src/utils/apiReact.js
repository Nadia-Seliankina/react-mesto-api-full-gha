//import { setToken } from './token';

// export const BASE_URL = "https://auth.nomoreparties.co";
// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = 'https://api.mesto.seliankina.nomoredomainsmonster.ru';

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : res.json().then((errData) => Promise.reject(errData));
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.ok
        ? res.json()
        : res.json().then((errData) => Promise.reject(errData));
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      //'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : res.json().then((errData) => Promise.reject(errData));
  });
};
