import { useState } from "react";
import Sidebar from "../teacherComponents/SideBar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const TeacherSettings = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAccountPrivate, setIsAccountPrivate] = useState(false);
  const [language, setLanguage] = useState("English");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    alert("You have logged out successfully!");
    navigate("/login");  // Redirect to login page (adjust route as needed)
  };

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Update profile picture preview
    }
  };

  // Function to handle saving settings
  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label htmlFor="profile-picture" className="ml-4 text-blue-500 cursor-pointer">
              Change Profile Picture
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              placeholder="Enter email"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isNotificationsEnabled}
              onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            />
            <label className="text-gray-700">Enable Course Notifications</label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isAccountPrivate}
              onChange={() => setIsAccountPrivate(!isAccountPrivate)}
            />
            <label className="text-gray-700">Make Profile Private</label>
          </div>
        </div>

        {/* Language & Theme Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Language & Theme Preferences</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dark Mode</label>
            <input
              type="checkbox"
              className="mr-2"
              checked={false}
              onChange={() => {}}
            />
            <label className="text-gray-700">Enable Dark Mode</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Settings
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
