import React from "react";
import Schedule from "../studentComponents/schedule";
import Sidebar from "../studentComponents/SideBar";

const SchedulePage = () => {
  return (
    <div className="flex h-screen w-full absolute left-0 top-0 bottom-0">
      <div >
        <Sidebar />
      </div>
      <div className="flex-1 p-6 overflow-y-auto w-full">
        <Schedule />
      </div>
    </div>
  );
};
export default SchedulePage;
