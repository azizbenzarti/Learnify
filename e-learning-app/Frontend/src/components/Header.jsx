import React, { useContext } from "react";
import { AuthContext } from "../contexts/userContext";
//import { getRoleFromToken } from "../utils/auth";
import { getDecodedToken } from "../utils/auth"; 

const Header = () => {
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  //const userRole = getRoleFromToken(jwt);
  const tokenData = getDecodedToken(jwt);


  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-lg font-bold">
        <p className="font-bold">Hello {tokenData?.name} 👋</p>
        {/* {userRole === "student" ? "What are you learning today ? ": "Greetings Teacher!"} */}
      </h2>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default Header;
