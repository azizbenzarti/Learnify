import { Link } from "react-router-dom";
import { HomeIcon, ChartBarIcon, CogIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from '@heroicons/react/24/outline'; // Make sure this import is correct


import { useNavigate } from "react-router-dom";

import { TrophyIcon } from "lucide-react";

const Sidebar = () => {
  const navigateTo = useNavigate();

  const handleSidebarHeaderClick = () => {
    navigateTo("/home"); // Redirect to home page
  };
  return (
    <div className="w-64 bg-white shadow-md p-4 h-full">
      <h2 className="text-lg font-bold mb-6" onClick={handleSidebarHeaderClick}>
        📚 E-Learning Platform
      </h2>
      <ul>
        {[
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
          name:"schedule",
          path:"/schedule",
          icon:<CalendarIcon className="w-5 h-5" />,
        }
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            {item.icon}
            <Link to={item.path} className="text-gray-700">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
