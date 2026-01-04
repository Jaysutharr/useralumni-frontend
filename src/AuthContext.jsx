// import React, { createContext, useState } from 'react';

// // Create the AuthContext
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null); // Token will be kept only in React state

//   // Function to log in the user and save the token
//   const login = (userToken) => {
//     setToken(userToken); // Save token in React state (no localStorage)
//   };

//   // Function to log out and clear the token
//   const logout = () => {
//     setToken(null); // Clear the token from state
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
