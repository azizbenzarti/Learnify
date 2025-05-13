// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllContent } from "../../Redux/Actions/content";
// import axios from "axios";

// const AISummarizer = React.memo(({ chapterId, state, updateState }) => {
//   const dispatch = useDispatch();
//   const [summary, setSummary] = useState(state.summary || "");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(state.error || null);
//   const controllerRef = useRef(null);

//   // Get content from Redux store
//   const contentDetails = useSelector(
//     (state) => state.contentFetchAllReducer || { contents: [] }
//   );
//   const { contents } = contentDetails;

//   // Get chapter content
//   const chapterContent = contents.find(
//     (content) => (content.chapter || { _id: null })._id === chapterId
//   );

//   // Fetch content only when needed
//   useEffect(() => {
//     if (chapterId && contents.length === 0) {
//       dispatch(fetchAllContent());
//     }
//   }, [chapterId, contents.length, dispatch]);

//   // Update parent state only when values actually change
//   useEffect(() => {
//     if (state.summary !== summary || state.error !== error) {
//       updateState({ summary, error });
//     }
//   }, [summary, error, updateState, state.summary, state.error]);

//   const generateSummary = useCallback(async () => {
//     if (!chapterContent?.data || chapterContent.data.trim() === "") {
//       setError("No chapter content available");
//       return;
//     }

//     // Cancel any ongoing request
//     if (controllerRef.current) {
//       controllerRef.current.abort();
//     }
//     controllerRef.current = new AbortController();

//     setLoading(true);
//     setError(null);

//     try {
//       const contentData = chapterContent.data;
//       const isUrl =
//         typeof contentData === "string" && contentData.startsWith("http");

//       const config = {
//         signal: controllerRef.current.signal,
//         headers: {
//           "Content-Type": isUrl ? "application/json" : "multipart/form-data",
//         },
//       };

//       if (isUrl) {
//         // Handle URL content
//         const fileResponse = await axios.get(contentData, {
//           responseType: "arraybuffer",
//           signal: controllerRef.current.signal,
//         });

//         if (fileResponse.data.byteLength === 0) {
//           throw new Error("Downloaded file is empty");
//         }

//         const contentType = fileResponse.headers["content-type"];
//         const formData = new FormData();
//         formData.append(
//           "file",
//           new Blob([fileResponse.data], { type: contentType }),
//           "content.pdf"
//         );

//         const response = await axios.post(
//           "http://localhost:5002/api/summary",
//           formData,
//           config
//         );
//         setSummary(response.data?.summary || "No summary generated");
//       } else {
//         // Handle direct text content
//         const response = await axios.post(
//           "http://localhost:5002/api/summary",
//           { text: contentData },
//           config
//         );
//         setSummary(response.data?.summary || "No summary generated");
//       }
//     } catch (error) {
//       if (!axios.isCancel(error)) {
//         console.error("Summary generation failed:", error);
//         setError(
//           error.response?.data?.error ||
//             error.message ||
//             "Failed to generate summary"
//         );
//       }
//     } finally {
//       setLoading(false);
//       controllerRef.current = null;
//     }
//   }, [chapterContent]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (controllerRef.current) {
//         controllerRef.current.abort();
//       }
//     };
//   }, []);

//   if (!chapterId) return <div className="p-4">No chapter selected.</div>;

//   return (
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-2">AI Summarizer</h3>
//       <button
//         onClick={generateSummary}
//         disabled={!chapterContent || loading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {loading ? "Generating..." : "Generate Summary"}
//       </button>

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">{error}</div>
//       )}

//       {summary && (
//         <div className="mt-4 p-4 bg-gray-50 rounded">
//           <h4 className="font-medium mb-2">Summary:</h4>
//           <p className="whitespace-pre-line">{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// });

// export default AISummarizer;
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContent } from "../../Redux/Actions/content";
import axios from "axios";

const isLink = (text) => typeof text === "string" && text.startsWith("http");

const getFallbackSummary = () => "No summary could be generated.";

const AISummarizer = ({ chapterId, state, updateState }) => {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState(state.summary || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(state.error || null);

  const contentDetails = useSelector(
    (state) => state.contentFetchAllReducer || { contents: [] }
  );
  const { contents } = contentDetails;

  const chapterContent = contents.find(
    (content) => (content.chapter || { _id: null })._id === chapterId
  );

  useEffect(() => {
    if (chapterId && !contents.length) {
      dispatch(fetchAllContent());
    }
  }, [dispatch, chapterId, contents.length]);

  useEffect(() => {
    const currentState = { summary, error };
    if (JSON.stringify(state) !== JSON.stringify(currentState)) {
      updateState(currentState);
    }
  }, [summary, error, updateState, state]);

  const handleGenerateSummary = useCallback(async () => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);
    setSummary("");

    if (!chapterContent?.data) {
      setError("No chapter content available");
      setLoading(false);
      return;
    }

    try {
      const contentData = chapterContent.data;

      const config = {
        cancelToken: source.token,
        headers: {
          "Content-Type": isLink(contentData)
            ? "application/json"
            : "multipart/form-data",
        },
        timeout: 30000,
      };

      const payload = isLink(contentData)
        ? { contentUrl: contentData }
        : { text: contentData };

      // Try JSON method first
      try {
        const response = await axios.post(
          "http://localhost:5002/api/summary",
          payload,
          config
        );

        if (response.data?.summary) {
          setSummary(response.data.summary);
          return;
        }
      } catch (jsonError) {
        if (!axios.isCancel(jsonError)) {
          console.log("JSON method failed, trying file upload:", jsonError.message);
        }
      }

      // Fallback to file upload
      if (!isLink(contentData)) {
        const tempBlob = new Blob([contentData], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", tempBlob, "chapter-content.txt");

        const uploadResponse = await axios.post(
          "http://localhost:5002/api/summary",
          formData,
          config
        );

        setSummary(uploadResponse.data?.summary || getFallbackSummary());
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Summary generation failed:", {
          error: error.response?.data || error.message,
          request: error.config,
        });
        setError(error.response?.data?.error || "Failed to generate summary.");
      }
    } finally {
      setLoading(false);
    }

    return () => source.cancel();
  }, [chapterContent]);

  if (!chapterId) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
        Please select a chapter to generate summary
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3">AI Summarizer</h3>

      <button
        onClick={handleGenerateSummary}
        disabled={!chapterContent || loading}
        className={`px-4 py-2 rounded-md ${
          !chapterContent || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white mb-4`}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className="p-3 bg-gray-50 rounded-md whitespace-pre-line">
          <h4 className="font-medium mb-2">Summary:</h4>
          {summary}
        </div>
      )}
    </div>
  );
};

export default React.memo(AISummarizer);