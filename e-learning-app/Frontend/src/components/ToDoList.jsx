import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { getDecodedToken } from "../utils/auth";

const ToDoList = ({ className = "" }) => {
  const [tasks, setTasks] = useState([]);
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  const { role } = getDecodedToken(jwt) || {};

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Example of hardcoded tasks based on role
        const roleBasedTasks =
          role === "tutor"
            ? ["Prepare Exam for React.js Course", "Grade Assignments", "Plan Next Class"]
            : ["Start Android Development course", "Java Quizes"];

        setTasks(roleBasedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [role]);

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-2">To Do List</h3>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="cursor-pointer rounded text-blue-500"
            />
            <span className="text-gray-700">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
