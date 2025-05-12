import React from "react";

const CoursesCrudTable = ({ courses = [], onAdd, onEdit, onDelete }) => {
    console.log("CoursesCrudTable received courses:", courses);
    // const testCourses = [
    //   {
    //     _id: "123",
    //     name: "React Basics",
    //     owner: "user1",
    //     description: "Intro to React",
    //   },
    // ];
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg">Manage Courses</h3>
        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tutor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{course._id}</td>
                  <td className="border px-4 py-2">{course.name}</td>
                  <td className="border px-4 py-2">{course.owner}</td>
                  <td className="border px-4 py-2">{course.description}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => onEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onDelete(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="5">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesCrudTable;
