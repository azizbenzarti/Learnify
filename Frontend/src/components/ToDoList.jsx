// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/userContext";
// import { getDecodedToken } from "../utils/auth";

// const ToDoList = ({ className = "" }) => {
//   const [tasks, setTasks] = useState([]);
//   const { auth } = useContext(AuthContext);
//   const [jwt] = auth;
//   const { role } = getDecodedToken(jwt) || {};

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         // Example of hardcoded tasks based on role
//         const roleBasedTasks =
//           role === "tutor"
//             ? ["Prepare Exam for React.js Course", "Grade Assignments", "Plan Next Class"]
//             : ["Start Android Development course", "Java Quizes"];

//         setTasks(roleBasedTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setTasks([]);
//       }
//     };

//     fetchTasks();
//   }, [role]);

//   return (
//     <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
//       <h3 className="text-lg font-semibold mb-2">To Do List</h3>
//       <ul className="space-y-2">
//         {tasks.map((task, index) => (
//           <li key={index} className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="cursor-pointer rounded text-blue-500"
//             />
//             <span className="text-gray-700">{task}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ToDoList;
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { getDecodedToken } from "../utils/auth";

const ToDoList = ({ className = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  const { role } = getDecodedToken(jwt) || {};

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Example of hardcoded tasks based on role
        const roleBasedTasks =
          role === "tutor"
            ? [
                { id: 1, title: "Prepare Exam for React.js Course", completed: false },
                { id: 2, title: "Grade Assignments", completed: false },
                { id: 3, title: "Plan Next Class", completed: false }
              ]
            : [
                { id: 4, title: "Start Android Development course", completed: false },
                { id: 5, title: "Java Quizes", completed: false }
              ];

        setTasks(roleBasedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [role]);

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
        title: newTaskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  // Card component
  const Card = ({ children }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );

  // CardHeader component
  const CardHeader = ({ children }) => (
    <div className="px-6 py-4 border-b border-gray-200">
      {children}
    </div>
  );

  // CardTitle component
  const CardTitle = ({ children }) => (
    <h3 className="text-lg font-semibold">{children}</h3>
  );

  // CardContent component
  const CardContent = ({ children }) => (
    <div className="p-6">{children}</div>
  );

  // Checkbox component
  const Checkbox = ({ checked, onChange, id }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={id}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
  );

  // Input component
  const Input = ({ value, onChange, placeholder, className, onKeyDown }) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );

  // Button component
  const Button = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <Button onClick={handleAddTask}>Add</Button>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 py-2 border-b last:border-b-0"
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                id={`task-${task.id}`}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm flex-1 cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToDoList;