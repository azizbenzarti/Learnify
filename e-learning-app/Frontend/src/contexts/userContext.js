import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with the token from local storage 
 const [jwt, setJwt] = useState(() => {
  const storedToken = localStorage.getItem("jwt");
  console.log("Stored Token from localStorage:", storedToken);
  return storedToken ?? ""; // Ensures it's never undefined
});




  // Update local storage whenever the token changes
  useEffect(() => {

    if (jwt) {
      localStorage.setItem("jwt", jwt); 
    } else {
      localStorage.removeItem("jwt"); 
    }
  }, [jwt]);

 console.log("Providing AuthContext:", { auth: [jwt, setJwt] }); 

  return (
    <AuthContext.Provider value={{ auth: [jwt, setJwt] }}>
      {children}
    </AuthContext.Provider>
  );
};
