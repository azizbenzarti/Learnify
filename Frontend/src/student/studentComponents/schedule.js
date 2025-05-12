import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentStudyPlans } from "../../Redux/Actions/studyPlan";
import { getIdFromToken } from "../../utils/auth";

const Schedule = () => {
  const token = localStorage.getItem("jwt");
  const studentId = getIdFromToken(token);
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();

  const { studyPlan = [] } = useSelector(
    (state) => state.studentStudyPlanReducer
  );

  useEffect(() => {
    dispatch(getStudentStudyPlans(studentId, token));
  }, [dispatch, studentId, token]);
  const state = useSelector((state) => state);

  console.log("Full Redux State:", state);

  console.log("studyPlan", studyPlan);
  // Time slots for the calendar - now with consistent hourly intervals
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00`;
  });

  // Helper function to convert time string to minutes since midnight
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  function parseDDMMYYYY(dateString) {
    if (!dateString) return null;

    const parts = dateString.split("-");
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    // Validate the date (accounts for invalid dates like 31-02-2023)
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }

    return null;
  }

  const getSessionsForDay = (targetDate) => {
    try {
      // Normalize target date (remove time component)
      const targetDay = new Date(targetDate);
      targetDay.setUTCHours(0, 0, 0, 0);
      const targetDayTime = targetDay.getTime();

      if (!studyPlan.length || !studyPlan[0]?.schedule?.weekly) return [];

      return studyPlan[0].schedule.weekly.filter((session) => {
        if (!session.date) return false;

        // Parse the DD-MM-YYYY format
        const sessionDate = parseDDMMYYYY(session.date);
        if (!sessionDate) {
          console.warn(
            `Invalid date format: ${session.date} - expected DD-MM-YYYY`
          );
          return false;
        }

        // Normalize session date (remove time component)
        sessionDate.setUTCHours(0, 0, 0, 0);

        // Compare dates
        return sessionDate.getTime() === targetDayTime;
      });
    } catch (error) {
      console.error("Error processing dates:", error);
      return [];
    }
  };

  // Render a session block with proper time slot alignment
  const renderSessionBlock = (session, index) => {
    const startMinutes = timeToMinutes(session.startTime);
    const endMinutes = timeToMinutes(session.endTime);
    const duration = endMinutes - startMinutes;

    // Calculate position and height based on time slots
    const slotHeight = 56; // Height of each time slot in pixels (matches your h-28 class)
    const topPosition = (startMinutes / 60) * slotHeight;
    const height = (duration / 60) * slotHeight;

    return (
      <div
        key={index}
        className={`absolute w-full left-0 bg-indigo-100 border border-indigo-200 rounded-md p-2 overflow-hidden`}
        style={{
          top: `${topPosition}px`,
          height: `${height}px`,
        }}
      >
        <div className="text-xs font-semibold text-indigo-800">
          {session.subject}
        </div>
        <div className="text-xs text-indigo-600">
          {session.startTime} - {session.endTime}
        </div>
        <div className="text-xs text-indigo-500 mt-1">{session.technique}</div>
      </div>
    );
  };

  // Get the days for the current week
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Render week view
  const renderWeekView = () => {
    const days = getWeekDays();

    return (
      <>
        <div className="grid grid-cols-7 border-t border-gray-200 sticky top-0 left-0 w-full">
          <div className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={`p-3.5 flex items-center justify-center text-sm font-medium ${
                day.getDate() === currentDate.getDate() &&
                day.getMonth() === currentDate.getMonth()
                  ? "text-indigo-600"
                  : "text-gray-900"
              }`}
            >
              {day.toLocaleString("default", { month: "short" })}{" "}
              {day.getDate()}
            </div>
          ))}
        </div>

        <div className="hidden grid-cols-7 sm:grid w-full overflow-x-auto">
          {/* Time column */}
          <div className="col-span-1">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className="h-28 p-3.5 border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100"
              >
                <span className="text-xs font-semibold text-gray-400">
                  {time}
                </span>
              </div>
            ))}
          </div>

          {/* Days columns */}
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="col-span-1 relative">
              {timeSlots.map((_, index) => (
                <div
                  key={index}
                  className="h-28 p-3.5 border-t border-r border-gray-200 relative"
                ></div>
              ))}
              {getSessionsForDay(day).map((session, sessionIndex) =>
                renderSessionBlock(session, sessionIndex)
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  // Render day view
  const renderDayView = () => {
    const sessions = getSessionsForDay(currentDate);

    return (
      <>
        <div className="grid grid-cols-2 border-t border-gray-200 sticky top-0 left-0 w-full">
          <div className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"></div>
          <div className="p-3.5 flex items-center justify-center text-sm font-medium text-indigo-600">
            {currentDate.toLocaleString("default", { month: "short" })}{" "}
            {currentDate.getDate()}
          </div>
        </div>

        <div className="hidden grid-cols-2 sm:grid w-full overflow-x-auto">
          {/* Time column */}
          <div className="col-span-1">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className="h-28 p-3.5 border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100"
              >
                <span className="text-xs font-semibold text-gray-400">
                  {time}
                </span>
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="col-span-1 relative">
            {timeSlots.map((_, index) => (
              <div
                key={index}
                className="h-28 p-3.5 border-t border-r border-gray-200 relative"
              ></div>
            ))}
            {sessions.map((session, index) =>
              renderSessionBlock(session, index)
            )}
          </div>
        </div>
      </>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return (
      <div className="grid grid-cols-7 border-t border-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                className="h-32 lg:h-28 p-0.5 md:p-3.5 border-t border-r border-gray-200"
              ></div>
            );
          }

          const daySessions = getSessionsForDay(day);

          return (
            <div
              key={index}
              className={`h-32 lg:h-28 p-0.5 md:p-3.5 border-t border-r border-gray-200 ${
                day.getDate() === currentDate.getDate() ? "bg-indigo-50" : ""
              }`}
            >
              <div className="flex justify-between">
                <span
                  className={`text-sm ${
                    day.getDate() === currentDate.getDate()
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-900"
                  }`}
                >
                  {day.getDate()}
                </span>
                {day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() && (
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                  )}
              </div>

              <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                {daySessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="text-xs p-1 bg-indigo-100 rounded text-indigo-800 truncate"
                    title={`${session.subject}: ${session.technique}`}
                  >
                    {session.subject}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Navigation functions
  const navigateToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date for display
  const formatDateDisplay = () => {
    if (view === "month") {
      return currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleString("default", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleString("default", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <section className="relative bg-stone-50 py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row max-md:gap-3 items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 4.50001L17 5.15001L17 4.50001ZM6.99999 4.50002L6.99999 3.85002L6.99999 4.50002ZM8.05078 14.65C8.40977 14.65 8.70078 14.359 8.70078 14C8.70078 13.641 8.40977 13.35 8.05078 13.35V14.65ZM8.00078 13.35C7.6418 13.35 7.35078 13.641 7.35078 14C7.35078 14.359 7.6418 14.65 8.00078 14.65V13.35ZM8.05078 17.65C8.40977 17.65 8.70078 17.359 8.70078 17C8.70078 16.641 8.40977 16.35 8.05078 16.35V17.65ZM8.00078 16.35C7.6418 16.35 7.35078 16.641 7.35078 17C7.35078 17.359 7.6418 17.65 8.00078 17.65V16.35ZM12.0508 14.65C12.4098 14.65 12.7008 14.359 12.7008 14C12.7008 13.641 12.4098 13.35 12.0508 13.35V14.65ZM12.0008 13.35C11.6418 13.35 11.3508 13.641 11.3508 14C11.3508 14.359 11.6418 14.65 12.0008 14.65V13.35ZM12.0508 17.65C12.4098 17.65 12.7008 17.359 12.7008 17C12.7008 16.641 12.4098 16.35 12.0508 16.35V17.65ZM12.0008 16.35C11.6418 16.35 11.3508 16.641 11.3508 17C11.3508 17.359 11.6418 17.65 12.0008 17.65V16.35ZM16.0508 14.65C16.4098 14.65 16.7008 14.359 16.7008 14C16.7008 13.641 16.4098 13.35 16.0508 13.35V14.65ZM16.0008 13.35C15.6418 13.35 15.3508 13.641 15.3508 14C15.3508 14.359 15.6418 14.65 16.0008 14.65V13.35ZM16.0508 17.65C16.4098 17.65 16.7008 17.359 16.7008 17C16.7008 16.641 16.4098 16.35 16.0508 16.35V17.65ZM16.0008 16.35C15.6418 16.35 15.3508 16.641 15.3508 17C15.3508 17.359 15.6418 17.65 16.0008 17.65V16.35ZM8.65 3C8.65 2.64101 8.35898 2.35 8 2.35C7.64102 2.35 7.35 2.64101 7.35 3H8.65ZM7.35 6C7.35 6.35899 7.64102 6.65 8 6.65C8.35898 6.65 8.65 6.35899 8.65 6H7.35ZM16.65 3C16.65 2.64101 16.359 2.35 16 2.35C15.641 2.35 15.35 2.64101 15.35 3H16.65ZM15.35 6C15.35 6.35899 15.641 6.65 16 6.65C16.359 6.65 16.65 6.35899 16.65 6H15.35ZM6.99999 5.15002L17 5.15001L17 3.85001L6.99999 3.85002L6.99999 5.15002ZM20.35 8.50001V17H21.65V8.50001H20.35ZM17 20.35H7V21.65H17V20.35ZM3.65 17V8.50002H2.35V17H3.65ZM7 20.35C6.03882 20.35 5.38332 20.3486 4.89207 20.2826C4.41952 20.2191 4.1974 20.1066 4.04541 19.9546L3.12617 20.8739C3.55996 21.3077 4.10214 21.4881 4.71885 21.571C5.31685 21.6514 6.07557 21.65 7 21.65V20.35ZM2.35 17C2.35 17.9245 2.34862 18.6832 2.42902 19.2812C2.51193 19.8979 2.69237 20.4401 3.12617 20.8739L4.04541 19.9546C3.89341 19.8026 3.78096 19.5805 3.71743 19.108C3.65138 18.6167 3.65 17.9612 3.65 17H2.35ZM20.35 17C20.35 17.9612 20.3486 18.6167 20.2826 19.108C20.219 19.5805 20.1066 19.8026 19.9546 19.9546L20.8738 20.8739C21.3076 20.4401 21.4881 19.8979 21.571 19.2812C21.6514 18.6832 21.65 17.9245 21.65 17H20.35ZM17 21.65C17.9244 21.65 18.6831 21.6514 19.2812 21.571C19.8979 21.4881 20.44 21.3077 20.8738 20.8739L19.9546 19.9546C19.8026 20.1066 19.5805 20.2191 19.1079 20.2826C18.6167 20.3486 17.9612 20.35 17 20.35V21.65ZM17 5.15001C17.9612 5.15 18.6167 5.15138 19.1079 5.21743C19.5805 5.28096 19.8026 5.39341 19.9546 5.54541L20.8738 4.62617C20.44 4.19238 19.8979 4.01194 19.2812 3.92902C18.6831 3.84862 17.9244 3.85001 17 3.85001L17 5.15001ZM21.65 8.50001C21.65 7.57557 21.6514 6.81686 21.571 6.21885C21.4881 5.60214 21.3076 5.05996 20.8738 4.62617L19.9546 5.54541C20.1066 5.6974 20.219 5.91952 20.2826 6.39207C20.3486 6.88332 20.35 7.53882 20.35 8.50001H21.65ZM6.99999 3.85002C6.07556 3.85002 5.31685 3.84865 4.71884 3.92905C4.10214 4.01196 3.55996 4.1924 3.12617 4.62619L4.04541 5.54543C4.1974 5.39344 4.41952 5.28099 4.89207 5.21745C5.38331 5.15141 6.03881 5.15002 6.99999 5.15002L6.99999 3.85002ZM3.65 8.50002C3.65 7.53884 3.65138 6.88334 3.71743 6.39209C3.78096 5.91954 3.89341 5.69743 4.04541 5.54543L3.12617 4.62619C2.69237 5.05999 2.51193 5.60217 2.42902 6.21887C2.34862 6.81688 2.35 7.57559 2.35 8.50002H3.65ZM3 10.65H21V9.35H3V10.65ZM8.05078 13.35H8.00078V14.65H8.05078V13.35ZM8.05078 16.35H8.00078V17.65H8.05078V16.35ZM12.0508 13.35H12.0008V14.65H12.0508V13.35ZM12.0508 16.35H12.0008V17.65H12.0508V16.35ZM16.0508 13.35H16.0008V14.65H16.0508V13.35ZM16.0508 16.35H16.0008V17.65H16.0508V16.35ZM7.35 3V6H8.65V3H7.35ZM15.35 3V6H16.65V3H15.35Z"
                fill="#111827"
              ></path>
            </svg>
            <h6 className="text-xl leading-8 font-semibold text-gray-900">
              {formatDateDisplay()}
            </h6>
            <div className="flex items-center gap-2">
              <button
                onClick={navigateToPrevious}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="#111827"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={navigateToToday}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600"
              >
                Today
              </button>
              <button
                onClick={navigateToNext}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="#111827"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-px rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setView("day")}
              className={`rounded-lg py-2.5 px-5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-indigo-600 ${
                view === "day" ? "bg-white text-indigo-600" : "text-gray-500"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`rounded-lg py-2.5 px-5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-indigo-600 ${
                view === "week" ? "bg-white text-indigo-600" : "text-gray-500"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("month")}
              className={`rounded-lg py-2.5 px-5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-indigo-600 ${
                view === "month" ? "bg-white text-indigo-600" : "text-gray-500"
              }`}
            >
              Month
            </button>
          </div>
        </div>
        <div className="relative">
          {view === "day" && renderDayView()}
          {view === "week" && renderWeekView()}
          {view === "month" && renderMonthView()}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
