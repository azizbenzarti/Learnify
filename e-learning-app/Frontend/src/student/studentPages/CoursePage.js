import { Link, useParams } from "react-router-dom";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";
import CourseList from "../studentComponents/CourseList";



const CoursePage = () => {
 
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
         <CourseList />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
