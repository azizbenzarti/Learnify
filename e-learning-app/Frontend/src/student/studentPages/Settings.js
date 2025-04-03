import { useState, useEffect } from "react";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";
import profileService from "../../services/profileService";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAccountPrivate, setIsAccountPrivate] = useState(false);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getAllStudentData();
        setName(profileData.name || "");
        setEmail(profileData.email || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    alert("You have logged out successfully!");
    navigate("/login");
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={email}
              readOnly
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Language & Theme Preferences
          </h2>
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
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isNotificationsEnabled}
              onChange={() =>
                setIsNotificationsEnabled(!isNotificationsEnabled)
              }
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

export default Settings;
