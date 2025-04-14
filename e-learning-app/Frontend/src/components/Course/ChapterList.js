import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listChapters, createChapter } from '../../Redux/Actions/chapter'; 
import ChapterContentCard from './ChapterContentCard'; 
import { FaPlus } from "react-icons/fa";
import { getRoleFromToken } from '../../utils/auth';

const ChapterList = () => {
  const token = localStorage.getItem("jwt");
  const role = getRoleFromToken(token);

  const { courseId } = useParams(); 
  const dispatch = useDispatch();

  const [chapterName, setChapterName] = useState('');

  const chapterList = useSelector((state) => state.chapterListReducer);
  const { chapters } = chapterList;

  const chapterCreate = useSelector((state) => state.chapterCreateReducer);
  const { loading, success, error } = chapterCreate;

  useEffect(() => {
    dispatch(listChapters());
  }, [dispatch, success]); 

  const filteredChapters = chapters.filter((chapter) => (chapter.course || { _id: null })._id === courseId);

  const handleCreateChapter = (e) => {
    e.preventDefault();
    dispatch(createChapter(chapterName, courseId)); 
    setChapterName(''); 
  };

  return (
    <div>
      {role !== "student" && (
        <div className="mb-6">
          <form onSubmit={handleCreateChapter} className="flex items-center gap-2">
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="Add a new chapter"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              {loading ? (
                "Creating..."
              ) : (
                <FaPlus className="w-5 h-5" /> 
              )}
            </button>
          </form>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      )}
      <div className="max-h-screen overflow-y-auto p-4">
        {filteredChapters && filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <div key={chapter._id}>
              <ChapterContentCard chapterId={chapter._id} chapterName={chapter.title} />
            </div>
          ))
        ) : (
          <div>No chapters available for this course</div>
        )}
      </div>
    </div>
  );
};

export default ChapterList;