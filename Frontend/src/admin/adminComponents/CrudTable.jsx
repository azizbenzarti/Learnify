import React from "react";

const CrudTable = ({ title, columns, data = [], onAdd, onDelete, onEdit }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="font-semibold text-lg">{title}</h3>
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
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id || row.id} className="hover:bg-gray-50">
                {Object.entries(row).map(([key, val]) => {
                  // Skip internal keys like _id/id if you don't want them displayed
                  if (key === "_id" || key === "id") return null;

                  return (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {val || "-"} {/* Fallback for empty values */}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-indigo-600 hover:text-indigo-900 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row._id || row.id)}
                        className="text-red-600 hover:text-red-900 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">10</span> of{" "}
        <span className="font-medium">20</span> results
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

export default CrudTable;
