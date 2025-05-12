// import { Link, useParams } from "react-router-dom";
// import Sidebar from "../studentComponents/SideBar";
// import Header from "../../components/Header";
// import CourseList from "../studentComponents/CourseList";

// const CoursePage = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div>
//         <Sidebar />
//       </div>
     
      
        
//           <CourseList />
//         </div>
    
   
//   );
// };

// export default CoursePage;
import { Link, useParams } from "react-router-dom";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";
// import CourseList from "../studentComponents/CourseList";
import StudentCourses from "./StudentCourses";

const CoursePage = () => {
  return (
   <div className="flex h-screen w-full absolute left-0 top-0">
    <div className="bg-blue-700 h-full w-64 "> {/* Fixed width for sidebar */}
        <Sidebar />
      </div>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto w-full mt-8">
        
          <StudentCourses />
        
      </main>
    </div>
  );
};

export default CoursePage;
