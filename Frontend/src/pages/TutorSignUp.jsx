import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import authService from "../services/authService";

export default function TutorSignupForm() {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
  });

  const [expertise, setExpertise] = useState([{ field: "", role: "", at: "" }]);
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleExpertiseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExpertise = [...expertise];
    updatedExpertise[index][name] = value;
    setExpertise(updatedExpertise);
  };

  const addExpertiseField = () => {
    setExpertise([...expertise, { field: "", role: "", at: "" }]);
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Validate required fields
      if (!credentials.name || !credentials.email) {
        throw new Error("Please fill all required fields");
      }

      if (!cvFile) {
        throw new Error("Please upload your CV");
      }

      // Validate expertise fields
      const invalidExpertise = expertise.some(
        (exp) => !exp.field || !exp.role || !exp.at
      );
      if (invalidExpertise) {
        throw new Error("Please fill all expertise fields");
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("cv", cvFile);
      formData.append("expertise", JSON.stringify(expertise));

      // Call the API
      const response = await authService.tutorSignUp(formData);

      setMessage(
        "Your application has been received. We will contact you soon."
      );

      // Clear form after successful submission
      setCredentials({
        name: "",
        email: "",
      });
      setExpertise([{ field: "", role: "", at: "" }]);
      setCvFile(null);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(
        error.response?.data?.error ||
          error.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigateTo("/login");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Become a tutor at Learnify
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please fill the application form
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-8">
            <h3 className="text-lg font-semibold text-gray-900">Credentials</h3>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={credentials.name}
                    onChange={handleCredentialsChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleCredentialsChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-8">
            <h3 className="text-lg font-semibold text-gray-900">Expertise</h3>
            {expertise.map((exp, index) => (
              <div
                key={index}
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6"
              >
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`field-${index}`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    Field
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="field"
                      id={`field-${index}`}
                      value={exp.field}
                      onChange={(e) => handleExpertiseChange(index, e)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`role-${index}`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="role"
                      id={`role-${index}`}
                      value={exp.role}
                      onChange={(e) => handleExpertiseChange(index, e)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`at-${index}`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    At
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="at"
                      id={`at-${index}`}
                      value={exp.at}
                      onChange={(e) => handleExpertiseChange(index, e)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <button
                type="button"
                onClick={addExpertiseField}
                className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Another Experience
              </button>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-8">
            <h3 className="text-lg font-semibold text-gray-900">CV</h3>
            <div className="mt-6">
              <label
                htmlFor="cv"
                className="block text-sm font-medium text-gray-900"
              >
                Upload your CV (PDF)
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="cv"
                  id="cv"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Message display area */}
          {message && (
            <div
              className={`mt-4 text-center text-sm ${
                message.includes("received") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
