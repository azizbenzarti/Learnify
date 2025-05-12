import React from "react";

const TeachersTable = ({ data, onAccept, onReject, onDelete }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
        <p className="text-gray-500">No teacher data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg">Manage Teachers</h3>
        <button
          onClick={() => console.log("Add new teacher")}
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((tutor) => (
              <tr key={tutor._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor.tutorDetails?.cv ? (
                    <button
                      onClick={() =>
                        window.open(tutor.tutorDetails.cv, "_blank")
                      }
                      className="text-indigo-600 hover:text-indigo-900 hover:underline flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View CV
                    </button>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor.verified ? "Verified" : "Pending Verification"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tutor.verified ? (
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(tutor._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onAccept(tutor._id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onReject(tutor._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">{data.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-sm">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md text-sm bg-indigo-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-sm">2</button>
          <button className="px-3 py-1 border rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TeachersTable;
