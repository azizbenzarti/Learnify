import React, { useState } from "react";

const ChapterForm = () => {
  const [chapters, setChapters] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Add a new chapter
  const addChapter = () => {
    if (chapterName.trim() === "") {
      alert("Chapter name cannot be empty!");
      return;
    }

    const newChapter = {
      id: Date.now(), 
      name: chapterName,
      content: chapterContent,
      file: selectedFile,
    };

    setChapters([...chapters, newChapter]);
    setChapterName("");
    setChapterContent("");
    setSelectedFile(null);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chapters:", chapters);
    alert("Chapters submitted successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Add Chapters</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chapter Name Input */}
        <div>
          <label htmlFor="chapterName" className="block text-sm font-medium text-gray-700">
            Chapter Name
          </label>
          <input
            type="text"
            id="chapterName"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter chapter name"
            required
          />
        </div>

        {/* Chapter Content Input */}
        <div>
          <label htmlFor="chapterContent" className="block text-sm font-medium text-gray-700">
            Chapter Content
          </label>
          <textarea
            id="chapterContent"
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter chapter content"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
            Upload File (Optional)
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Add Chapter Button */}
        <button
          type="button"
          onClick={addChapter}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Chapter
        </button>

        {/* Display Added Chapters */}
        <div className="mt-6 space-y-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{chapter.name}</h3>
              <p className="text-gray-600">{chapter.content}</p>
              {chapter.file && (
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Uploaded File: {chapter.file.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Chapters
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChapterForm;