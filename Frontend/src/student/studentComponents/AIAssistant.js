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
//       const isUrl = typeof contentData === "string" && contentData.startsWith("http");
      
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
//         formData.append("file", new Blob([fileResponse.data], { type: contentType }), "content.pdf");

//         const response = await axios.post(
//           "http://localhost:8000/api/summary",
//           formData,
//           config
//         );
//         setSummary(response.data?.summary || "No summary generated");
//       } else {
//         // Handle direct text content
//         const response = await axios.post(
//           "http://localhost:8000/api/summary",
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
//           error.message ||
//           "Failed to generate summary"
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
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContent } from "../../Redux/Actions/content";
import axios from "axios";

const AIAssistant = React.memo(({ chapterId, state, updateState }) => {
  const dispatch = useDispatch();
  const controllerRef = useRef(null);
  
  // Initialize state from props or defaults
  const [question, setQuestion] = useState(state.question || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(state.error || '');
  const [chatHistory, setChatHistory] = useState(state.chatHistory || []);

  // Get content from Redux store
  const contentDetails = useSelector(
    (state) => state.contentFetchAllReducer || { contents: [] }
  );
  const { contents } = contentDetails;

  // Memoize chapter content to avoid unnecessary recalculations
  const chapterContent = useMemo(() => 
    contents.find((content) => (content.chapter || { _id: null })._id === chapterId),
    [contents, chapterId]
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
      chatHistory,
      question,
      error
    };
    if (JSON.stringify(state) !== JSON.stringify(currentState)) {
      updateState(currentState);
    }
  }, [chatHistory, question, error, updateState, state]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!chapterContent?.data) {
      setError("No chapter content available.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    // Cancel any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    setLoading(true);
    setError('');
    
    // Add user question to chat history immediately
    const userMessage = { 
      sender: 'user', 
      content: question, 
      timestamp: new Date().toISOString() 
    };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Clear the input field
    setQuestion('');

    try {
      const contentData = chapterContent.data;
      const isUrl = typeof contentData === 'string' && contentData.startsWith('http');
      
      const config = {
        signal: controllerRef.current.signal,
        headers: {
          'Content-Type': isUrl ? 'application/json' : 'multipart/form-data',
        },
      };

      let response;
      if (isUrl) {
        response = await axios.post(
          'http://localhost:5002/api/assistant',
          { contentUrl: contentData, question },
          config
        );
      } else {
        try {
          // First try direct text approach
          response = await axios.post(
            'http://localhost:5002/api/assistant',
            { text: contentData, question },
            config
          );
        } catch (jsonError) {
          if (!axios.isCancel(jsonError)) {
            // Fallback to file upload
            const contentBlob = new Blob([contentData], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', contentBlob, 'chapter-content.txt');
            formData.append('question', question);
            response = await axios.post(
              'http://localhost:5002/api/assistant',
              formData,
              config
            );
          }
        }
      }

      // Add AI response to chat history
      const aiMessage = { 
        sender: 'ai', 
        content: response.data.answer, 
        timestamp: new Date().toISOString() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
      
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', error);
        const errorMessage = {
          sender: 'error',
          content: error.response?.data?.error || 'Failed to get answer. Please try again.',
          timestamp: new Date().toISOString()
        };
        setChatHistory(prev => [...prev, errorMessage]);
        setError(error.response?.data?.error || 'Failed to get answer. Please try again.');
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  }, [chapterContent, question]);

  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  // Memoize chat history display to avoid unnecessary re-renders
  const chatDisplay = useMemo(() => {
    if (chatHistory.length === 0) {
      return (
        <div className="text-gray-500 text-center py-4">
          No messages yet. Ask a question to start the conversation.
        </div>
      );
    }

    return chatHistory.map((message, index) => (
      <div 
        key={`${message.timestamp}-${index}`} 
        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`max-w-3/4 p-3 rounded-lg ${
            message.sender === 'user' 
              ? 'bg-blue-100 text-blue-900' 
              : message.sender === 'error'
                ? 'bg-red-100 text-red-900'
                : 'bg-gray-100 text-gray-900'
          }`}
        >
          <div className="font-medium mb-1">
            {message.sender === 'user' 
              ? 'You' 
              : message.sender === 'error'
                ? 'Error'
                : 'AI Assistant'}
          </div>
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    ));
  }, [chatHistory]);

  if (!chapterId) return <div className="p-4">No chapter selected.</div>;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded border">
          {error}
        </div>
      )}

      {/* Chat history display */}
      <div className="space-y-4 max-h-96 overflow-y-auto p-2 border rounded">
        {chatDisplay}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask a question about the content..."
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!chapterContent || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
        {chatHistory.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
});

export default AIAssistant;