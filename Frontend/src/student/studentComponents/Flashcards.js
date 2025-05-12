import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContent } from "../../Redux/Actions/content";
import axios from "axios";

const isLink = (text) => {
  return typeof text === "string" && text.startsWith("http");
};

const getFallbackFlashcards = () => [
  {
    question: "What is a flashcard?",
    answer:
      "A flashcard is a learning aid with a question on one side and the answer on the other.",
  },
];

const Flashcards = ({ chapterId, state, updateState }) => {
  const dispatch = useDispatch();
  const [flashcards, setFlashcards] = useState(state.flashcards || []);
  const [currentIndex, setCurrentIndex] = useState(state.currentIndex || 0);
  const [isFlipped, setIsFlipped] = useState(state.isFlipped || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(state.error || null);

  const contentDetails = useSelector(
    (state) => state.contentFetchAllReducer || { contents: [] }
  );
  const { contents } = contentDetails;
  const chapterContent = contents.find(
    (content) => (content.chapter || { _id: null })._id === chapterId
  );

  // Memoized fetch content
  useEffect(() => {
    if (chapterId && !contents.length) {
      dispatch(fetchAllContent());
    }
  }, [dispatch, chapterId, contents.length]);

  // Optimized state update
  useEffect(() => {
    const currentState = { flashcards, currentIndex, isFlipped, error };
    if (JSON.stringify(state) !== JSON.stringify(currentState)) {
      updateState(currentState);
    }
  }, [flashcards, currentIndex, isFlipped, error, updateState, state]);

  const handleGenerateFlashcards = useCallback(async () => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);

    if (!chapterContent?.data) {
      setError("No chapter content available");
      setLoading(false);
      return;
    }

    try {
      let contentData = chapterContent.data;

      const config = {
        cancelToken: source.token,
        headers: {
          "Content-Type": isLink(contentData)
            ? "application/json"
            : "multipart/form-data",
        },
      };

      const payload = isLink(contentData)
        ? { contentUrl: contentData }
        : { text: contentData };

      // Try text/JSON method first
      try {
        const response = await axios.post(
          "http://localhost:5002/api/generate-flashcards",
          payload,
          config
        );

        if (response.data?.flashcards) {
          setFlashcards(response.data.flashcards);
          return;
        }
      } catch (jsonError) {
        if (!axios.isCancel(jsonError)) {
          console.log(
            "JSON method failed, trying file upload:",
            jsonError.message
          );
        }
      }

      // Fallback to file upload if needed
      if (!isLink(contentData)) {
        const tempBlob = new Blob([contentData], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", tempBlob, "chapter-content.txt");

        const uploadResponse = await axios.post(
          "http://localhost:5002/api/generate-flashcards",
          formData,
          config
        );
        setFlashcards(
          uploadResponse.data?.flashcards || getFallbackFlashcards()
        );
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Flashcard generation failed:", {
          error: error.response?.data || error.message,
          request: error.config,
        });
        setError(
          error.response?.data?.error || "Failed to generate flashcards"
        );
        setFlashcards(getFallbackFlashcards());
      }
    } finally {
      if (!source.token.reason) {
        setLoading(false);
      }
    }

    return () => source.cancel("Operation canceled by component unmount");
  }, [chapterContent]);

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((idx) => (idx + 1) % flashcards.length);
  }, [flashcards.length]);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((idx) => (idx - 1 + flashcards.length) % flashcards.length);
  }, [flashcards.length]);

  if (!chapterId) return <div className="p-4">No chapter selected.</div>;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Generate Flashcards</h3>

      <button
        onClick={handleGenerateFlashcards}
        disabled={!chapterContent || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 mb-6"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">{error}</div>
      )}

      {flashcards.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevCard}
              disabled={flashcards.length <= 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Card {currentIndex + 1} of {flashcards.length}
            </span>
            <button
              onClick={nextCard}
              disabled={flashcards.length <= 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div
            className={`relative w-full h-64 mx-auto transition-all duration-300 cursor-pointer ${
              isFlipped ? "bg-blue-500 text-white" : "bg-white"
            } rounded-lg shadow-md p-6 flex items-center justify-center`}
            onClick={() => setIsFlipped((f) => !f)}
          >
            <div className="text-center">
              <p className="text-xl font-medium">
                {isFlipped
                  ? `A: ${flashcards[currentIndex]?.answer}`
                  : `Q: ${flashcards[currentIndex]?.question}`}
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Click to {isFlipped ? "see question" : "see answer"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Flashcards);
