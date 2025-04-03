import { Link, useParams } from "react-router-dom";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

const courses = [
    {
        id: 1,
        name: "Mathematics 101",
        chapters: [
            { title: "Chapter 1: Algebra", content: "This is the content of Chapter 1: Algebra." }, 
            { title: "Chapter 2: Geometry", content: "This is the content of Chapter 2: Geometry." },        
        ],
    },
        ]

const CoursePage = () => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) return <div className="p-6">Course not found.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Chapters</h2>
          <ul className="list-disc ml-6">
            {course.chapters.map((chapter, index) => (
              <li key={index} className="text-gray-700">
                <Link to={`/course/${course.id}/chapter/${index}`} className="text-blue-500 hover:underline">
                  📖 {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
