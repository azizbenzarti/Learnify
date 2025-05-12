import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const navigateTo = useNavigate();
  const [selectedFields, setSelectedFields] = useState([]);
  const [currentLevel, setCurrentLevel] = useState("");

  const handleFieldChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleLevelChange = (e) => {
    setCurrentLevel(e.target.value);
  };

  const handleSkip = () => {
    setSelectedFields(["Software Development"]);
    setCurrentLevel("beginner");
    navigateTo("/home"); // Redirect to home
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    navigateTo("/home"); // Redirect to home
  };

  const fields = [
    "Software Development",
    "Human Resources",
    "Data & Analytics",
    "Education & Training",
    "Information Technology",
    "Customer Support",
    "Marketing",
    "Health & Wellness",
    "Design",
    "Writing",
    "Finance & Accounting",
    "Legal",
    "Product & Project Management",
    "Art",
    "Business Operations",
    "None of the above",
    "Sales & Business Development",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <p className="text-center text-2xl font-bold text-black-900">
            Your account has been verified!
          </p>
          <p className="mt-2 text-center text-sm p-2 rounded inline-block bg-[#DAF7A6] text-black flex items-center justify-center mx-auto">
            Answer a few questions to improve your content recommendations
          </p>
          <br />
          <h2 className="text-center text-2xl font-bold text-gray-800">
            What field are you interested in?
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field} className="flex items-center">
                <input
                  id={field}
                  name="field"
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldChange(field)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={field}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {field}
                </label>
              </div>
            ))}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              What is your current level?
            </label>
            <select
              value={currentLevel}
              onChange={handleLevelChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select your level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetails;
