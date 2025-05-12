// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import {
//   HomeIcon,
//   ChartBarIcon,
//   CogIcon,
//   ClipboardIcon,
//   CalendarIcon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { TrophyIcon } from "lucide-react";
// import { AuthContext } from "../../contexts/userContext";

// const Sidebar = () => {
//   const navigateTo = useNavigate();
//   const { auth } = useContext(AuthContext);
//   const [jwt, setJwt] = auth;

//   const handleLogout = () => {
//     setJwt(null); // Clear the token from context
//     navigateTo("/"); // Redirect to the login page
//   };

//   const handleSidebarHeaderClick = () => {
//     navigateTo("/home");
//   };

//   const menuItems = [
//     {
//       name: "Overview",
//       path: "/student",
//       icon: <HomeIcon className="w-5 h-5" />,
//     },
//     {
//       name: "Courses",
//       path: "/courses",
//       icon: <ClipboardIcon className="w-5 h-5" />,
//     },
//     {
//       name: "Grades",
//       path: "/grades",
//       icon: <TrophyIcon className="w-5 h-5" />,
//     },
//     {
//       name: "Notes",
//       path: "/notes",
//       icon: <ChartBarIcon className="w-5 h-5" />,
//     },
//     {
//       name: "Settings",
//       path: "/student-settings",
//       icon: <CogIcon className="w-5 h-5" />,
//     },
//     {
//       name: "Schedule",
//       path: "/schedule",
//       icon: <CalendarIcon className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="w-64 bg-white shadow-md p-4 h-full flex flex-col justify-between">
//       <div>
//         <h2
//           className="text-lg font-bold mb-6 cursor-pointer"
//           onClick={handleSidebarHeaderClick}
//         >
//           📚 E-Learning Platform
//         </h2>
//         <ul>
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
//             >
//               {item.icon}
//               <Link to={item.path} className="text-gray-700">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Logout button at the bottom */}
//       <div className="mt-4">
//         <li
//           className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
//           onClick={handleLogout}
//         >
//           <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-500" />
//           <span className="text-red-500">Logout</span>
//         </li>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardIcon,
  CalendarIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { TrophyIcon } from "lucide-react";
import { AuthContext } from "../../contexts/userContext";

const Sidebar = () => {
  const navigateTo = useNavigate();
  const { auth } = useContext(AuthContext);
  const [jwt, setJwt] = auth;

  const handleLogout = () => {
    setJwt(null);
    navigateTo("/");
  };

  const handleSidebarHeaderClick = () => {
    navigateTo("/home");
  };

  const menuItems = [
    {
      name: "Overview",
      path: "/student",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <ClipboardIcon className="w-5 h-5" />,
    },
    {
      name: "Grades",
      path: "/grades",
      icon: <TrophyIcon className="w-5 h-5" />,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/student-settings",
      icon: <CogIcon className="w-5 h-5" />,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: <CalendarIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-64 h-full bg-blue-600 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-blue-600">
        <h2 
          className="text-lg font-bold cursor-pointer hover:text-blue-100 transition-colors"
          onClick={handleSidebarHeaderClick}
        >
          📚 Learnify
        </h2>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-2">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 p-3 mx-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-blue-600 transition-colors text-red-300 hover:text-red-100"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;