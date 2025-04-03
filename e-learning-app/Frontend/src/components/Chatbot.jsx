import { getRoleFromToken } from "../utils/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/userContext";

const Chatbot = ({ showChatbot, setShowChatbot }) => {
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  const role = getRoleFromToken(jwt);

  const greeting =
    role === "teacher"
      ? "How can I assist with your class today?"
      : "How can I help with your learning?";

  return (
    <>
      {" "}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-[#2A9D8F] text-white p-4 rounded-full shadow-lg hover:bg-[#21867A] transition"
      >
        🤖
      </button>
      {showChatbot && (
        <div className="fixed bottom-20 right-5 bg-white p-4 rounded-lg shadow-md w-72">
          <div className="flex justify-between items-center">
            <h5 className="font-bold">RAG Bot</h5>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-red-500"
            >
              X
            </button>
          </div>
          <p className="mt-2 text-gray-700">
            {greeting}
          </p>
          <input
            type="text"
            placeholder="Type your question..."
            className="w-full p-2 border rounded mt-2"
          />
          <button className="w-full mt-2 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#21867A] transition">
            Send
          </button>
        </div>
      )}
    </>
  );
};
export default Chatbot;