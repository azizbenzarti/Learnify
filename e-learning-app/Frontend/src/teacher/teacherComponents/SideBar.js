import { Link } from "react-router-dom";
//import { HomeIcon, ClipboardListIcon, ChartBarIcon, CogIcon } from "@heroicons/react/outline";

import { HomeIcon, ChartBarIcon, CogIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-white shadow-md p-4 ">
      <h2 className="text-lg font-bold mb-6 text-black">
        📚 E-Learning Platform
      </h2>
      <ul>
        {[
          {
            name: "Overview",
            path: "/teacher",
            icon: <HomeIcon className="w-5 h-5 text-gray-800" />,
          },
          {
            name: "Courses",
            path: "/teacher-courses",
            icon: <ClipboardIcon className="w-5 h-5 text-gray-800" />,
          },
          {
            name: "Settings",
            path: "/teacher-settings",
            icon: <CogIcon className="w-5 h-5 text-gray-800" />,
          },
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
