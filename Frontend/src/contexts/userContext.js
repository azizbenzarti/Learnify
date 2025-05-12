// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Initialize state with the token from local storage
//  const [jwt, setJwt] = useState(() => {
//   const storedToken = localStorage.getItem("jwt");
//   console.log("Stored Token from localStorage:", storedToken);
//   return storedToken ?? ""; // Ensures it's never undefined
// });




//   // Update local storage whenever the token changes
//   useEffect(() => {

//     if (jwt) {
//       localStorage.setItem("jwt", jwt);
//     } else {
//       localStorage.removeItem("jwt");
//     }
//   }, [jwt]);

//  console.log("Providing AuthContext:", { auth: [jwt, setJwt] });

//   return (
//     <AuthContext.Provider value={{ auth: [jwt, setJwt] }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { getRoleFromToken } from "../utils/auth"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with the token from local storage
  const [jwt, setJwt] = useState(() => {
    const storedToken = localStorage.getItem("jwt");
    console.log("Stored Token from localStorage:", storedToken);
    return storedToken ?? ""; // Ensures it's never undefined
  });

  // Add role state derived from the token
  const [role, setRole] = useState(() => {
    const storedToken = localStorage.getItem("jwt");
    return storedToken ? getRoleFromToken(storedToken) : null;
  });

  // Update local storage and role whenever the token changes
  useEffect(() => {
    if (jwt) {
      localStorage.setItem("jwt", jwt);
      const currentRole = getRoleFromToken(jwt);
      setRole(currentRole);
      console.log("User role:", currentRole);
    } else {
      localStorage.removeItem("jwt");
      setRole(null);
    }
  }, [jwt]);

  console.log("Providing AuthContext:", {
    auth: [jwt, setJwt],
    role: role, // Adding role to context
  });

  return (
    <AuthContext.Provider
      value={{
        auth: [jwt, setJwt],
        role: role, // Make role available to consumers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

