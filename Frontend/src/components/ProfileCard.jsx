import { useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { getDecodedToken } from "../utils/auth"; 
const ProfileCard = ({ className = "" }) => {
  const { auth } = useContext(AuthContext);
  const [jwt] = auth;
  const tokenData = getDecodedToken(jwt);
  // Convert role naming (tutor → Teacher)
  const displayRole = tokenData?.role === "tutor" ? "Teacher" : "Student";

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold">Profile</h3>
      <div className="flex items-center mt-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full w-10 h-10"
        />
        <div className="ml-3">
          <p className="font-bold">{tokenData?.name || "User"}</p>
          <p className="text-gray-500 text-sm">{displayRole}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
