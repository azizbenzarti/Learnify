import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventCalendar = ({ title, icon, events = [] }) => {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (e) => new Date(e.date).toDateString() === date.toDateString()
      );
      return event ? (
        <p className="text-sm text-blue-600">{event.name}</p>
      ) : null;
    }
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold flex items-center mb-4">
        {icon} {title}
      </h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="w-full border rounded-lg"
      />
    </section>
  );
};

export default EventCalendar;
