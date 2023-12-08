// Key used to store user information in local storage
const USER_KEY = "user";

// Save user information to the session using local storage
export const saveUserToSession = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Retrieve user information from the session
export const getUserFromSession = () => {
  // Get the user information as a string from local storage
  const userString = localStorage.getItem(USER_KEY);
  // Parse the user information string into a JavaScript object
  return userString ? JSON.parse(userString) : null;
};

// Clear user information from the session
export const clearSession = () => {
  // Remove the user information from local storage
  localStorage.removeItem(USER_KEY);
};
