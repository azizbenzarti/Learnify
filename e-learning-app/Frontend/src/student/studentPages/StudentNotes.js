import { useState } from "react";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [openNote, setOpenNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      setNotes([...notes, { title: newTitle, content: newContent }]);
      setNewTitle("");
      setNewContent("");
    }
  };

  const openNoteEditor = (idx) => {
    setOpenNote(idx);
    setIsEditing(true);
  };

  const closeEditor = () => {
    setOpenNote(null);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>
        <h1 className="text-3xl font-bold mb-4">📒 Notes</h1>
        {!isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-4 mb-4 border rounded-lg bg-white h-40 resize-none shadow-sm"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
              onClick={addNote}
            >
              ➕ Add Note
            </button>
            <div className="mt-6 space-y-4">
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 shadow bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => openNoteEditor(idx)}
                >
                  <div className="text-lg font-semibold">{note.title}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          
          <div>
            
            <div className=" bg-gray-50  p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={closeEditor}
              >
                ✖
              </button>
              <h1 className="text-3xl font-bold mb-4 text-center">{notes[openNote].title}</h1>
              <textarea
                value={notes[openNote].content}
                onChange={(e) => {
                  const updatedNotes = [...notes];
                  updatedNotes[openNote].content = e.target.value;
                  setNotes(updatedNotes);
                }}
                className="w-full p-4 border rounded-lg bg-white h-60 resize-none shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
