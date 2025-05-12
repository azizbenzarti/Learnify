import { useState, useRef, useEffect } from "react";

const Chatbot = ({ showChatbot, setShowChatbot }) => {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      // Add temporary "typing" indicator
      setMessages((prev) => [...prev, { role: "ai", content: "..." }]);

      // Real API call to backend
      const response = await fetch("http://localhost:5002/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const { reply } = await response.json();

      // Update the last message with the full response
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = reply;
        return newMessages;
      });
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Error: " + error.message;
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      askAI();
    }
  };

  return (
    <>
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-[#2A9D8F] text-white p-4 rounded-full shadow-lg hover:bg-[#21867A] transition-all duration-300 z-50"
      >
        {showChatbot ? "✕" : "🤖"}
      </button>

      {showChatbot && (
        <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl w-80 h-[500px] flex flex-col border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#2A9D8F] text-white p-3 flex justify-between items-center">
            <h5 className="font-bold text-lg">AI Assistant</h5>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-[#2A9D8F] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                disabled={loading}
              />
              <button
                onClick={askAI}
                disabled={loading || !input.trim()}
                className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#21867A] disabled:opacity-50 transition-all"
              >
                {loading ? "..." : "→"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
