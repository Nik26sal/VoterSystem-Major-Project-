import React from "react";
import { useNavigate } from "react-router-dom";

const Event = ({ event }) => {
  const navigate = useNavigate();

  /* ================= DATE FORMAT ================= */
  const formatDateRange = (start, end) => {
    const startDate = new Date(start).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const endDate = new Date(end).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${startDate} - ${endDate}`;
  };

  const isOngoing = event.status === "ongoing";
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 w-80 flex flex-col justify-between min-h-[260px]">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          {event.title}
        </h3>

        <p className="text-gray-600 mb-3">{event.subtitle}</p>

        <p className="text-sm text-gray-500 mb-2">
          📅 {formatDateRange(event.startAt, event.endAt)}
        </p>

        <p className="text-sm text-gray-500">
          👥 Candidates: {event.candidates?.length || 0}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
            event.status === "ongoing"
              ? "bg-green-100 text-green-700"
              : event.status === "upcoming"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {event.status}
        </span>

        <button
          onClick={() => isOngoing && navigate(`/event/${event._id}`)}
          disabled={!isOngoing}
          className={`px-4 py-2 rounded-md text-white transition ${
            isOngoing
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Vote Now
        </button>
      </div>
    </div>
  );
};

export default Event;
