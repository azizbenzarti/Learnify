// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getIdFromToken } from "../../utils/auth";

// const Recommendations = () => {
//   const token = localStorage.getItem("jwt");
//   const userId = getIdFromToken(token);

//   const [recommendationData, setRecommendationData] = useState({
//     title: "Your Study Recommendations",
//     icon: "📚",
//     recommendations: [],
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:5002/api/recommendations/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             timeout: 10000,
//           }
//         );

//         setRecommendationData(response.data);
//       } catch (err) {
//         console.error("Error:", err);
//         setError(err.response?.data?.error || err.message);
//         setRecommendationData((prev) => ({
//           ...prev,
//           recommendations: [
//             "Review key concepts using flashcards",
//             "Take a practice quiz on recent topics",
//             "Explore new material for 25 minutes",
//           ],
//         }));
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchRecommendations();
//   }, [userId, token]);

//   const renderActionButtons = (recommendation) => {
//     const actions = [];
//     if (recommendation.toLowerCase().includes("flashcards")) {
//       actions.push(
//         <button
//           key="flashcards"
//           className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
//           onClick={() => console.log("Launch flashcards")}
//         >
//           Flashcards
//         </button>
//       );
//     }
//     if (recommendation.toLowerCase().includes("quiz")) {
//       actions.push(
//         <button
//           key="quiz"
//           className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded transition-colors"
//           onClick={() => console.log("Start quiz")}
//         >
//           Quiz
//         </button>
//       );
//     }
//     return actions.length > 0 ? (
//       <div className="mt-2 flex gap-2">{actions}</div>
//     ) : null;
//   };

//   // ... (keep loading/error JSX from your original file)

//   return (
//     <section className="mt-6 bg-white p-6 rounded-xl shadow-md">
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-xl">{recommendationData.icon}</span>
//         <h2 className="text-lg font-semibold">{recommendationData.title}</h2>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
//           ⚠️ {error} - Showing default recommendations
//         </div>
//       )}

//       <ul className="space-y-3">
//         {recommendationData.recommendations.map((rec, index) => (
//           <li
//             key={index}
//             className="p-4 bg-[#FAF3E0] hover:bg-[#FAE8C8] rounded-lg transition-colors border border-[#F0E0C0]"
//           >
//             <p className="text-gray-800">{rec}</p>
//             {renderActionButtons(rec)}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default Recommendations;
import { useEffect, useState } from "react";
import axios from "axios";
import { getIdFromToken } from "../../utils/auth";

const Recommendations = () => {
  const token = localStorage.getItem("jwt");
  const userId = getIdFromToken(token);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5002/api/recommendations/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000,
          }
        );

        setRecommendations(response.data.recommendations || []);
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.error || err.message);
        // Fallback recommendations
        setRecommendations([
          {
            id: 1,
            title: "Advanced React Development",
            instructor: "Sarah Wilson",
            level: "Intermediate",
            rating: 4.8,
            students: 2456,
          },
          {
            id: 2,
            title: "Content Marketing Masterclass",
            instructor: "Michael Thompson",
            level: "Beginner",
            rating: 4.6,
            students: 1879,
          },
          {
            id: 3,
            title: "Data Science Essentials",
            instructor: "Dr. Alexandra Chen",
            level: "Intermediate",
            rating: 4.9,
            students: 3245,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRecommendations();
  }, [userId, token]);

  // Card component
  const Card = ({ children, className }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );

  // CardHeader component
  const CardHeader = ({ children, className }) => (
    <div className={`px-6 py-4 border-b border-gray-200 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );

  // CardTitle component
  const CardTitle = ({ children }) => (
    <h3 className="text-lg font-semibold">{children}</h3>
  );

  // CardContent component
  const CardContent = ({ children }) => (
    <div className="p-6">{children}</div>
  );

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recommended For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
        <a href="/courses/recommended" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            ⚠️ {error} - Showing default recommendations
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((course) => (
            <div 
              key={course.id} 
              className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer"
            >
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.instructor}</p>
              <div className="flex justify-between mt-2 text-xs">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {course.level}
                </span>
                <span className="text-gray-500">
                  ★ {course.rating} ({course.students?.toLocaleString()} students)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;