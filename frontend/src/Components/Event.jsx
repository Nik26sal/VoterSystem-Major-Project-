import React from 'react'
import { useNavigate } from 'react-router-dom'

const Event = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div
      key={event.id}
      className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 w-80 flex flex-col justify-between min-h-64"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-3">{event.subheading}</p>
        <p className="text-sm text-gray-500 mb-4">📅 {event.date}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            event.status === "Ongoing"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {event.status}
        </span>
        {event.status === "Ongoing" ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            Vote Now
          </button>
        ) : (
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
            disabled
          >
            Closed
          </button>
        )}
      </div>
    </div>
  )
}

export default Event
