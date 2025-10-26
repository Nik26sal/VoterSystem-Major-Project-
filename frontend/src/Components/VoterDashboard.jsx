import React, { useState } from "react";
import { Calendar} from "lucide-react";

export default function VoterDashboard() {
  const [participatedEvents] = useState([
    {
      title: "Annual Tech Fest",
      subtitle: "Innovation & AI",
      startDate: "2025-03-10",
      endDate: "2025-03-12",
    },
    {
      title: "Cultural Night",
      subtitle: "Music & Art",
      startDate: "2025-02-05",
      endDate: "2025-02-05",
    },
    {
      title: "Sports Meet 2025",
      subtitle: "Run for Unity",
      startDate: "2025-01-15",
      endDate: "2025-01-16",
    },
    
  ]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Voter Dashboard
          </h1>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-8">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Events Participated</p>
              <p className="text-2xl font-semibold text-gray-800">
                {participatedEvents.length}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              History of Events Voter Participated
            </h2>

            {participatedEvents.length === 0 ? (
              <p className="text-gray-500">No participation records found.</p>
            ) : (
              <div className="space-y-4">
                {participatedEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">{event.subtitle}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.startDate} → {event.endDate}
                      </p>
                    </div>
                    <button
                      className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      onClick={() => alert("Handle event details later")}
                    >
                      More Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
