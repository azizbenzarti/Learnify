import { Link } from "react-router-dom";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

const courses = [
  { id: 1, name: "Mathematics 101", chapters: ["Algebra", "Geometry"] },
  { id: 2, name: "Physics", chapters: ["Newton's Laws", "Relativity"] },
];

const StudentCourses = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
      <div className="bg-white shadow-md p-4 mb-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <Link to={`/course/${course.id}`} key={course.id}>
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
                <h2 className="font-semibold">{course.name}</h2>
                <ul className="mt-2">
                  {course.chapters.map((chapter, idx) => (
                    <li key={idx} className="text-gray-600">📖 {chapter}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentCourses;
