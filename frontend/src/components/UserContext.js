import React, { createContext, useContext, useState } from "react";

// Create a context to manage user information
const UserContext = createContext();

// UserProvider component to wrap the application and provide user-related functionality
export const UserProvider = ({ children }) => {
  // State to manage user information
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = (userData) => {
    // Set user data when a user logs in
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data when a user logs out
    setUser(null);
  };

  // Provide the UserContext to the components in the application
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user-related information and functions
export const useUser = () => {
  // Get the user context from the nearest UserProvider
  const context = useContext(UserContext);

  // Throw an error if useUser is not used within a UserProvider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  // Return user context
  return context;
};
