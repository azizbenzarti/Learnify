import { useState } from "react";

// Mock data for schedule
const scheduleItems = [
  {
    id: 1,
    title: "Web Development Lab",
    time: "2:00 PM - 3:30 PM",
    date: "Today",
    type: "Class",
  },
  {
    id: 2,
    title: "Marketing Strategy Project Due",
    time: "11:59 PM",
    date: "Today",
    type: "Assignment",
  },
  {
    id: 3,
    title: "Psychology Midterm",
    time: "10:00 AM - 11:30 AM",
    date: "Tomorrow",
    type: "Exam",
  },
];

// Calendar icon component
const CalendarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

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

const EventCalendar = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Schedule</CardTitle>
        <a href="/schedule" className="text-sm text-blue-600 hover:underline">
          Full Calendar
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-start gap-3 border-l-4 pl-4 py-2 border-blue-500 bg-blue-50 rounded-r-md shadow-sm"
            >
              <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium inline-block mt-1">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCalendar;