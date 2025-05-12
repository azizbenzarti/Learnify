import { useState } from "react";
import { Search, Plus, Folder, File, Star, MoreVertical } from "lucide-react";
import Sidebar from "../studentComponents/SideBar";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Web Development Basics",
      content: "HTML, CSS, and JavaScript form the foundation of web development...",
      category: "Computer Science",
      createdAt: "2025-05-02T10:30:00",
      starred: true,
    },
    {
      id: 2,
      title: "Marketing Principles",
      content: "The 4 Ps of marketing: Product, Price, Place, and Promotion...",
      category: "Business",
      createdAt: "2025-05-05T14:45:00",
      starred: false,
    },
    {
      id: 3,
      title: "Psychology Research Methods",
      content: "Qualitative vs. Quantitative research methods and their applications...",
      category: "Psychology",
      createdAt: "2025-05-08T09:15:00",
      starred: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [editingNote, setEditingNote] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'starred', or 'recent'

  // Filter notes based on search query and active tab
  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "starred") {
        return matchesSearch && note.starred;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (activeTab === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      category: "Uncategorized",
      createdAt: new Date().toISOString(),
      starred: false,
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditingNote({
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
    });
  };

  // Update a note
  const updateNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map((note) =>
      note.id === activeNote.id
        ? {
            ...note,
            title: editingNote.title || "Untitled Note",
            content: editingNote.content,
            category: editingNote.category || "Uncategorized",
          }
        : note
    );
    
    setNotes(updatedNotes);
    setActiveNote({
      ...activeNote,
      title: editingNote.title || "Untitled Note",
      content: editingNote.content,
      category: editingNote.category || "Uncategorized",
    });
  };

  // Toggle star status
  const toggleStar = (noteId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, starred: !note.starred } : note
    );
    setNotes(updatedNotes);
    
    if (activeNote && activeNote.id === noteId) {
      setActiveNote({ ...activeNote, starred: !activeNote.starred });
    }
  };

  // Delete a note
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
      setEditingNote({
        title: "",
        content: "",
        category: "",
      });
    }
  };

  // Handle note selection
  const selectNote = (note) => {
    setActiveNote(note);
    setEditingNote({
      title: note.title,
      content: note.content,
      category: note.category,
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen w-full absolute left-0 top-0">
      <div>
        <Sidebar />
      
     </div>
    <div className="w-full mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={createNewNote}
              className="p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="w-full">
            <div className="flex rounded-md bg-blue-100 p-1">
              <button 
                className={`flex-1 py-2 px-4 rounded-md ${activeTab === 'all' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-blue-200'}`}
                onClick={() => setActiveTab('all')}
              >
                All Notes
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md ${activeTab === 'starred' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-blue-200'}`}
                onClick={() => setActiveTab('starred')}
              >
                Starred
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md ${activeTab === 'recent' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-blue-200'}`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
            </div>
            
            {/* Notes list */}
            <div className="mt-4 space-y-2">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg cursor-pointer flex items-start justify-between ${
                      activeNote?.id === note.id
                        ? "bg-indigo-100 border border-indigo-200"
                        : "bg-white hover:bg-gray-50 border border-gray-100"
                    }`}
                    onClick={() => selectNote(note)}
                  >
                    <div className="flex items-start space-x-3">
                      <File className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-800 line-clamp-1">{note.title}</h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(note.createdAt)} • {note.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(note.id);
                      }}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          note.starred ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">
                  {activeTab === 'starred' ? 'No starred notes' : 
                   activeTab === 'recent' ? 'No recent notes' : 'No notes found'}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right editor */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            {activeNote ? (
              <>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, title: e.target.value })
                    }
                    onBlur={updateNote}
                    className="text-xl font-bold bg-transparent border-0 border-b border-transparent hover:border-gray-200 focus:border-indigo-300 focus:outline-none w-full px-0 py-1"
                    placeholder="Note title"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStar(activeNote.id)}
                      className={`p-2 rounded-md ${
                        activeNote.starred ? "text-yellow-500" : "text-gray-400"
                      } hover:bg-gray-100`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          activeNote.starred ? "fill-yellow-400" : ""
                        }`}
                      />
                    </button>
                    <button 
                      className="p-2 rounded-md text-gray-400 hover:bg-gray-100"
                      onClick={() => deleteNote(activeNote.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center">
                    <Folder className="h-4 w-4 text-gray-500 mr-2" />
                    <input
                      value={editingNote.category}
                      onChange={(e) =>
                        setEditingNote({ ...editingNote, category: e.target.value })
                      }
                      onBlur={updateNote}
                      className="h-8 text-sm border-0 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:ring-1 focus:ring-indigo-300 rounded-md px-2 w-full"
                      placeholder="Category"
                    />
                  </div>
                  <textarea
                    value={editingNote.content}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, content: e.target.value })
                    }
                    onBlur={updateNote}
                    className="min-h-[400px] w-full resize-none focus:ring-indigo-300 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-1"
                    placeholder="Start typing your note here..."
                  />
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-indigo-100 p-6 rounded-full mb-4">
                  <File className="h-12 w-12 text-indigo-500" />
                </div>
                <h2 className="text-xl font-bold mb-2">No Note Selected</h2>
                <p className="text-gray-500 mb-6">
                  Select a note from the list or create a new one
                </p>
                <button 
                  onClick={createNewNote}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notes;