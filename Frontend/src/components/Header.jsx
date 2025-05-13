// import React, { useContext } from "react";
// import { AuthContext } from "../contexts/userContext";
// //import { getRoleFromToken } from "../utils/auth";
// import { getDecodedToken } from "../utils/auth"; 

// const Header = () => {
//   const { auth } = useContext(AuthContext);
//   const [jwt] = auth;
//   //const userRole = getRoleFromToken(jwt);
//   const tokenData = getDecodedToken(jwt);


//   return (
//     <div className="flex justify-between items-center p-4 bg-white shadow-md">
//       <h2 className="text-lg font-bold">
//         <p className="font-bold">Hello {tokenData?.name} 👋</p>
//         {/* {userRole === "student" ? "What are you learning today ? ": "Greetings Teacher!"} */}
//       </h2>
//       <input
//         type="text"
//         placeholder="Search..."
//         className="p-2 border rounded-md"
//       />
//     </div>
//   );
// };

// export default Header;



import { User } from "lucide-react";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { getRoleFromToken } from "../utils/auth";
import { getDecodedToken } from "../utils/auth"; 



export default function Header() {
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  //const userRole = getRoleFromToken(jwt);
  const tokenData = getDecodedToken(jwt);
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
<h1 className="text-3xl font-bold text-blue-500">Welcome back, {tokenData?.name}!</h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          <User className="h-5 w-5 bg-blue" />
        </div>
      
      </div>
    </div>
  );
}
