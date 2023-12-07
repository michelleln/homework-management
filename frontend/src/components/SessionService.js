// sessionService.js

const USER_KEY = "user";

export const saveUserToSession = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromSession = () => {
  const userString = localStorage.getItem(USER_KEY);
  return userString ? JSON.parse(userString) : null;
};

export const clearSession = () => {
  localStorage.removeItem(USER_KEY);
};
