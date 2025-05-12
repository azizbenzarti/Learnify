import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContent, uploadContent, deleteContent } from "../../Redux/Actions/content";
import { deleteChapter } from "../../Redux/Actions/chapter";
import { FaTrash, FaUpload } from "react-icons/fa";
import { getRoleFromToken } from "../../utils/auth";

export default function ChapterContentCard({ chapterId, chapterName }) {
  const token = localStorage.getItem("jwt");
  const role = getRoleFromToken(token);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Add a reference to the file input

  // Fetch content details from Redux store
  const contentDetails = useSelector(
    (state) => state.contentFetchAllReducer || { contents: [] }
  );
  const { contents } = contentDetails;

  // Upload content state
  const contentUpload = useSelector((state) => state.contentUploadReducer || {});
  const { loading: uploadLoading, error: uploadError, success: uploadSuccess } = contentUpload;

  // Delete content state
  const contentDelete = useSelector((state) => state.contentDeleteReducer || {});
  const { loading: deleteLoading, error: deleteError } = contentDelete;

  // Fetch content when the component mounts or chapterId changes
  useEffect(() => {
    if (chapterId) {
      dispatch(fetchAllContent());
    }
  }, [dispatch, chapterId]);

  // Reset file input and state after successful upload
  useEffect(() => {
    if (uploadSuccess) {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input value
      }
    }
  }, [uploadSuccess]);

  // Filter content based on chapterId
  const filteredContent = contents.filter(
    (content) => (content.chapter || { _id: null })._id === chapterId
  );

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (file) {
      dispatch(uploadContent(file, chapterId)).then(() => {
        dispatch(fetchAllContent()); 
      });
    }
  };

  // Handle chapter deletion
  const handleDeleteChapter = () => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(chapterId));
    }
  };

  // Handle content deletion
  const handleDeleteContent = (contentId) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      dispatch(deleteContent(contentId));
    }
  };

  return (
    <label
      htmlFor={`accordion-${chapterId}`}
      className="relative flex flex-col rounded-md border border-gray-100 shadow-md mb-4"
    >
      <input className="peer hidden" type="checkbox" id={`accordion-${chapterId}`} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <div className="relative cursor-pointer select-none py-4 px-6">
        <h3 className="text-lg font-semibold text-gray-700">{chapterName}</h3>
      </div>
      <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-64 peer-checked:overflow-y-auto">
        {filteredContent && filteredContent.length > 0 ? (
          filteredContent.map((content) => (
            <div key={content._id} className="flex justify-between items-center px-6 py-2">
              <a
                href={content.data}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:border-b-purple-500 hover:text-purple-500 flex items-center"
              >
                <img src="/Assets/pdf.png" alt="PDF Icon" className="w-5 h-5 inline-block" />
                <span className="ml-2">View {content.fileType} file</span>
              </a>
              {role!=="student" && (
              <button
                onClick={() => handleDeleteContent(content._id)}
                disabled={deleteLoading}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash className="w-5 h-5" />
              </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center px-6">No content yet</div>
        )}
      </div>
    {/* Upload file input and button - only for non-students */}
{role !== "student" && (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-2">
      <input
        type="file"
        id={`file-upload-${chapterId}`}
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <label 
        htmlFor={`file-upload-${chapterId}`} 
        className="cursor-pointer text-gray-600 hover:text-gray-800"
      >
        <FaUpload className="w-5 h-5" />
      </label>
      {file && (
        <button
          onClick={handleUpload}
          disabled={uploadLoading}
          className="text-purple-600 hover:text-purple-700"
        >
          {uploadLoading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  </div>
)}
        {role!=="student" && (
        <button onClick={handleDeleteChapter} className="text-red-500 hover:text-red-700 absolute bottom-4 right-4">
          <FaTrash className="w-5 h-5" />
        </button>
        )}

      </label>
  );
}