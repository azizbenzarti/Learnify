import { useParams } from "react-router-dom"; // Import course data
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

const courses = [
  {
    id: 1,
    name: "Mathematics 101",
    chapters: [
      {
        title: "Chapter 1: Algebra",
        content: "This is the content of Chapter 1: Algebra.",
      },
      {
        title: "Chapter 2: Geometry",
        content: "This is the content of Chapter 2: Geometry.",
      },
    ],
  },    
    ]

const ChapterPage = () => {
  const { id, chapterIndex } = useParams();
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) return <div className="p-6">Course not found.</div>;

  const chapter = course.chapters[parseInt(chapterIndex)];

  if (!chapter) return <div className="p-6">Chapter not found.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>
        <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">{course.name} - {chapter.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <p className="text-gray-700">{chapter.content}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChapterPage;
