import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from "./student/studentPages/StudentCourses";
import Notes from "./student/studentPages/StudentNotes";
import Settings from "./student/studentPages/Settings";
import TeacherSettings from "./teacher/teacherPages/TeacherSettings";
import Studentdashboard from "./student/studentPages/StudentDashboard";
import Teacherdashboard from "./teacher/teacherPages/TeacherDashboard";
import TeacherCourses from "./teacher/teacherPages/TeacherCourses";
import CoursePage from "./student/studentPages/CoursePage";
import Grades from "./student/studentPages/Grades";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TutorSignUp from "./pages/TutorSignUp";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import PostUserSignUp from "./pages/PostUserSignUp";
import ChapterForm from "./pages/ChapterForm";
import CourseContent from "./pages/CourseContent";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./admin/adminPages/AdminDashboard";
import CourseInfo from "./components/Course/CourseInfo";
import { AuthProvider } from "./contexts/userContext";
import SchedulePage from "./student/studentPages/schedule";
import { AppearanceProvider } from "./contexts/AppearanceContex.js";

const App = () => {
  return (
    <AuthProvider>
      
      <Router>
        <div className="flex">
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/student" element={<Studentdashboard />} />
              <Route path="/teacher" element={<Teacherdashboard />} />
              <Route path="/teacher-courses" element={<TeacherCourses />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/course/:courseId" element={<CourseContent />} />
              <Route path="/teacher-settings" element={<TeacherSettings />} />

              <Route path="/notes" element={<Notes />} />
              <Route path="/student-settings" element={<Settings />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/teacher-signup" element={<TutorSignUp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
             
              <Route path="/post-user-signup" element={<PostUserSignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/chapter" element={<ChapterForm />} />
              <Route path="/course/:courseId" element={<CourseContent />} />
              <Route path="/schedule" element={<SchedulePage />} />
            </Routes>
          </div>
        </div>
      </Router>
        
    </AuthProvider>
  );
};

export default App;
