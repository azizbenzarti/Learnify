import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContent } from "../../Redux/Actions/content";
import axios from "axios";

const Quiz = React.memo(({ chapterId, state, updateState }) => {
  const dispatch = useDispatch();
  const [quizQuestions, setQuizQuestions] = useState(state.quizQuestions || []);
  const [selectedAnswers, setSelectedAnswers] = useState(
    state.selectedAnswers || {}
  );
  const [showResults, setShowResults] = useState(state.showResults || false);
  const [currentIndex, setCurrentIndex] = useState(state.currentIndex || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(state.error || null);
  const controllerRef = React.useRef(null);

  // Get content from Redux store
  const contentDetails = useSelector(
    (state) => state.contentFetchAllReducer || { contents: [] }
  );
  const { contents } = contentDetails;

  // Get chapter content
  const chapterContent = contents.find(
    (content) => (content.chapter || { _id: null })._id === chapterId
  );

  // Fetch content only when needed
  useEffect(() => {
    if (chapterId && contents.length === 0) {
      dispatch(fetchAllContent());
    }
  }, [chapterId, contents.length, dispatch]);

  // Update parent state only when necessary
  useEffect(() => {
    const currentState = {
      quizQuestions,
      selectedAnswers,
      showResults,
      currentIndex,
      error,
    };
    if (JSON.stringify(state) !== JSON.stringify(currentState)) {
      updateState(currentState);
    }
  }, [
    quizQuestions,
    selectedAnswers,
    showResults,
    currentIndex,
    error,
    updateState,
    state,
  ]);

  const getFallbackQuestions = useCallback(
    () => [
      {
        question: "What is process synchronization?",
        options: [
          "Memory management technique",
          "Coordinating access to shared resources",
          "CPU scheduling algorithm",
          "File storage management",
        ],
        correctAnswer: "Coordinating access to shared resources",
        explanation:
          "Synchronization ensures orderly access to shared resources",
      },
    ],
    []
  );

  const handleGenerateQuiz = useCallback(async () => {
    // Cancel any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setQuizQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentIndex(0);

    if (!chapterContent?.data) {
      setError("No chapter content available");
      setLoading(false);
      return;
    }

    try {
      const contentData = chapterContent.data;
      const isUrl =
        typeof contentData === "string" && contentData.startsWith("http");

      const config = {
        signal: controllerRef.current.signal,
        headers: {
          "Content-Type": isUrl ? "application/json" : "multipart/form-data",
        },
      };

      let response;
      if (isUrl) {
        response = await axios.post(
          "http://localhost:5002/api/quizzes",
          { contentUrl: contentData },
          config
        );
      } else {
        try {
          // First try JSON approach
          response = await axios.post(
            "http://localhost:5002/api/quizzes",
            { text: contentData },
            config
          );
        } catch (jsonError) {
          if (!axios.isCancel(jsonError)) {
            // Fallback to file upload
            const tempBlob = new Blob([contentData], { type: "text/plain" });
            const formData = new FormData();
            formData.append("file", tempBlob, "chapter-content.txt");
            response = await axios.post(
              "http://localhost:5002/api/quizzes",
              formData,
              config
            );
          }
        }
      }

      const questions = Array.isArray(response?.data?.quiz?.questions)
        ? response.data.quiz.questions
        : Array.isArray(response?.data?.questions)
        ? response.data.questions
        : [];

      setQuizQuestions(questions.length ? questions : getFallbackQuestions());
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Quiz generation failed:", error);
        setError(error.response?.data?.error || "Failed to generate quiz");
        setQuizQuestions(getFallbackQuestions());
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  }, [chapterContent, getFallbackQuestions]);

  const handleSelect = useCallback(
    (option) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentIndex]: option,
      }));
    },
    [currentIndex]
  );

  const calculateScore = useMemo(
    () =>
      quizQuestions.reduce(
        (score, q, idx) =>
          score + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0),
        0
      ),
    [quizQuestions, selectedAnswers]
  );

  const currentQuestion = quizQuestions[currentIndex] || {};
  const isLast = currentIndex === quizQuestions.length - 1;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  if (!chapterId) return <div className="p-4">No chapter selected.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-6">Chapter Quiz</h3>
      <button
        onClick={handleGenerateQuiz}
        disabled={!chapterContent || loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 mb-6"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {quizQuestions.length > 0 && (
        <div className="quiz-container">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            <button
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.min(quizQuestions.length - 1, i + 1)
                )
              }
              disabled={isLast}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">
              {currentQuestion.question}
            </h4>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={`${currentIndex}-${idx}`}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-3 text-left rounded border transition-all ${
                    selectedAnswers[currentIndex] === option
                      ? "bg-blue-50 border-blue-500"
                      : "border-gray-200 hover:bg-gray-50"
                  } ${
                    showResults && option === currentQuestion.correctAnswer
                      ? "bg-green-50 border-green-500"
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResults && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <p className="font-medium">
                    Score: {calculateScore} / {quizQuestions.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {calculateScore >= quizQuestions.length / 2
                      ? "Good job!"
                      : "Keep practicing!"}
                  </p>
                </div>
                {currentQuestion.explanation && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!showResults && isLast && (
              <button
                onClick={() => setShowResults(true)}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Quiz;
