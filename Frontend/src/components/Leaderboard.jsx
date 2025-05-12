const Leaderboard = () => {
  const leaders = [
    { name: "Charles Puyol", points: 12_450 },
    { name: "Alexandra Morgan", points: 12_333 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
      <ul>
        {leaders.map((leader, index) => (
          <li
            key={index}
            className="flex justify-between p-2 border-b last:border-0"
          >
            <span>
              {index + 1}. {leader.name}
            </span>
            <span className="font-bold">{leader.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
