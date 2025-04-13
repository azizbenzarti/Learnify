import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, resetCourseCreate ,listCourses} from "../../Redux/Actions/course";
import { getIdFromToken } from "../../utils/auth"; 


const AddCourseForm = ({ closeModal }) => {
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

 
  const token = localStorage.getItem('jwt'); 
  //console.log("Token retrieved from localStorage:", token); // debugging 
const id = getIdFromToken(token); 



  // Access the create course state from Redux
  const { loading, success, error } = useSelector(
    (state) => state.courseCreateReducer
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch createCourse action
    //console.log("User ID from token:", id);  // debugging
    if (id) {
      
      dispatch(createCourse(name, description, id)); 
    } else {
      console.error("Failed to retrieve user ID from token.");
    }
    
  };

  useEffect(() => {
    if (success && !loading) {
      closeModal(); 
      dispatch(resetCourseCreate()); 
       dispatch(listCourses());// Reset the success state
    }
  }, [success, loading, closeModal, dispatch]);

  // Reset form values
  const resetForm = () => {
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">Add Course</h2>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Course Title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    placeholder="CS101"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                Course Description
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  placeholder="Write a few sentences to describe the course."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">Error: {error}</div>}
    </form>
  );
};

export default AddCourseForm;
