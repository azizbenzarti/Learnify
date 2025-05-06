import React from "react";
import Schedule from "../studentComponents/schedule"; 
import Sidebar from "../studentComponents/SideBar";

const SchedulePage = () => {
    return (
    <div className="flex min-h-screen">
    
    <div className="w-64 bg-gray-800 text-white">
      <Sidebar />
    </div>
    <div className="flex-1 p-6 bg-gray-100">
    <Schedule/>

    </div>
  </div>
    )
}
export default SchedulePage;