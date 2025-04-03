const Courses = ({ title, icon, courses }) => (
  <section className="bg-white p-4 rounded-lg shadow-md mt-6">
    <h2 className="text-lg font-semibold flex items-center mb-4">{icon} {title}</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="text-center">
          <h3 className="font-medium mb-2">{course.name}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-[#A1C6EA] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
          <button className="w-full bg-white border border-[#7DA9C8] text-[#7DA9C8] px-4 py-2 rounded-lg hover:bg-[#7DA9C8] transition">
            Continue Learning
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default Courses;
