const Recommendations = ({ title, icon, recommendations }) => (
  <section className="mt-6 bg-white p-6 rounded-xl shadow-md mt-6">
    <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
    <h2 className="text-lg font-semibold flex items-center">{icon} {title}</h2>
    <ul className="mt-3 space-y-2">
      {recommendations.map((rec, index) => (
        <li key={index} className="p-3 bg-[#FAE3B0] rounded-lg">{rec}</li>
      ))}
    </ul>
  </section>
);
export default Recommendations;