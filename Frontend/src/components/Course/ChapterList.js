import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listChapters, createChapter } from "../../Redux/Actions/chapter";
import ChapterContentCard from "./ChapterContentCard";
import {
  FaPlus,
  FaRobot,
  FaLightbulb,
  FaListAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { getRoleFromToken } from "../../utils/auth";
import AISummarizer from "../../student/studentComponents/AISummarizer";
import AIAssistant from "../../student/studentComponents/AIAssistant";
import Flashcards from "../../student/studentComponents/Flashcards";
import Quiz from "../../student/studentComponents/Quiz";
import Header from "../Header";
import Sidebar from "../../student/studentComponents/SideBar";

const ChapterList = () => {
  const token = localStorage.getItem("jwt");
  const role = getRoleFromToken(token);

  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [chapterName, setChapterName] = useState("");
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  // State for each AI feature
  const [aiStates, setAiStates] = useState({
    summary: {},
    assistant: {},
    flashcards: {},
    quiz: {},
  });

  const chapterList = useSelector((state) => state.chapterListReducer);
  const { chapters } = chapterList;

  const chapterCreate = useSelector((state) => state.chapterCreateReducer);
  const { loading, success, error } = chapterCreate;

  useEffect(() => {
    dispatch(listChapters());
  }, [dispatch, success]);

  const filteredChapters = chapters.filter(
    (chapter) => (chapter.course || { _id: null })._id === courseId
  );

  const handleCreateChapter = (e) => {
    e.preventDefault();
    dispatch(createChapter(chapterName, courseId));
    setChapterName("");
  };

  const openTool = (chapterId, tool) => {
    setActiveChapter(chapterId);
    setActiveTool(tool);
  };

  const closeTool = () => {
    setActiveTool(null);
    setActiveChapter(null);
  };

  // Update AI feature state
  const updateAiState = (tool, chapterId, newState) => {
    setAiStates((prev) => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        [chapterId]: newState,
      },
    }));
  };

  // Get current AI feature state
  const getAiState = (tool, chapterId) => {
    return aiStates[tool]?.[chapterId] || {};
  };

  return (
    <div className="flex flex-col">
      {/* Chapters list */}
      <div className="space-y-4">
        {role !== "student" && (
          <div className="mb-6">
            <form
              onSubmit={handleCreateChapter}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                placeholder="Add a new chapter"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {loading ? "Creating..." : <FaPlus className="w-5 h-5" />}
              </button>
            </form>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        )}

        {filteredChapters && filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <div
              key={chapter._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <ChapterContentCard
                chapterId={chapter._id}
                chapterName={chapter.title}
              />

              {role === "student" && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => openTool(chapter._id, "summary")}
                    className="px-3 py-1 flex items-center gap-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100"
                  >
                    <FaLightbulb size={12} /> Summary
                  </button>
                  <button
                    onClick={() => openTool(chapter._id, "assistant")}
                    className="px-3 py-1 flex items-center gap-1 bg-green-50 text-green-600 rounded-md text-sm hover:bg-green-100"
                  >
                    <FaRobot size={12} /> Ask AI
                  </button>
                  <button
                    onClick={() => openTool(chapter._id, "flashcards")}
                    className="px-3 py-1 flex items-center gap-1 bg-purple-50 text-purple-600 rounded-md text-sm hover:bg-purple-100"
                  >
                    <FaListAlt size={12} /> Flashcards
                  </button>
                  <button
                    onClick={() => openTool(chapter._id, "quiz")}
                    className="px-3 py-1 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-md text-sm hover:bg-amber-100"
                  >
                    <FaQuestionCircle size={12} /> Quiz
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">
            No chapters available for this course
          </div>
        )}
      </div>

      {/* AI Tools Modal */}
      {activeTool && activeChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-medium text-lg">
                {activeTool === "summary" && "Chapter Summary"}
                {activeTool === "assistant" && "AI Learning Assistant"}
                {activeTool === "flashcards" && "Interactive Flashcards"}
                {activeTool === "quiz" && "Chapter Quiz"}
              </h3>
              <button
                onClick={closeTool}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {activeTool === "summary" && (
                <AISummarizer
                  chapterId={activeChapter}
                  state={getAiState("summary", activeChapter)}
                  updateState={(newState) =>
                    updateAiState("summary", activeChapter, newState)
                  }
                />
              )}

              {activeTool === "assistant" && (
                <AIAssistant
                  chapterId={activeChapter}
                  state={getAiState("assistant", activeChapter)}
                  updateState={(newState) =>
                    updateAiState("assistant", activeChapter, newState)
                  }
                />
              )}

              {activeTool === "flashcards" && (
                <Flashcards
                  chapterId={activeChapter}
                  state={getAiState("flashcards", activeChapter)}
                  updateState={(newState) =>
                    updateAiState("flashcards", activeChapter, newState)
                  }
                />
              )}

              {activeTool === "quiz" && (
                <Quiz
                  chapterId={activeChapter}
                  state={getAiState("quiz", activeChapter)}
                  updateState={(newState) =>
                    updateAiState("quiz", activeChapter, newState)
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
