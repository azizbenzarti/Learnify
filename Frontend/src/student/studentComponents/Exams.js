const Exams = ({ title, icon, exams }) => (
  <section className="rounded-lg  mt-6">
    <h2 className="text-lg font-semibold flex items-center">{icon} {title}</h2>
    <div className="mt-4 space-y-3">
      {exams.map((exam) => (
        <div key={exam.id} className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-medium">{exam.name}</h3>
          <p className="text-gray-600">📅 {exam.date}</p>
          <button className="mt-2 border border-[#2A9D8F] text-[#2A9D8F] px-4 py-2 rounded-lg hover:bg-[#2A9D8F] hover:text-white transition">
            View Details
          </button>
        </div>
      ))}
    </div>
  </section>
);
export default Exams;