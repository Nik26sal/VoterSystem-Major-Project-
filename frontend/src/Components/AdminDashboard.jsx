import React, { useState } from "react";
import { Calendar, PlusCircle, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [view, setView] = useState("main");
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    { id:1,title: "Annual Tech Fest", subtitle: "Innovation & AI", startDate: "2025-03-10", endDate: "2025-03-12" },
    { id:2,title: "Cultural Night", subtitle: "Music & Art", startDate: "2025-02-05", endDate: "2025-02-05" },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    candidates: [],
  });
  const [candidateName, setCandidateName] = useState("");

  const handleAddCandidate = () => {
    if (candidateName.trim()) {
      setNewEvent({ ...newEvent, candidates: [...newEvent.candidates, candidateName] });
      setCandidateName("");
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) {
      alert("Please fill in all required fields.");
      return;
    }
    setEvents([...events, newEvent]);
    setNewEvent({
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      candidates: [],
    });
    setView("main");
    alert("Event created successfully!");
  };

  return (
    <div className="pt-20 min-h-max bg-gray-50 h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {view === "main" && (
            <>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-8">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-800">{events.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setView("create")}
                  className="flex items-center justify-center gap-3 p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
                >
                  <PlusCircle className="w-6 h-6" />
                  <span className="font-medium text-lg">Create New Event</span>
                </button>

                <button
                  onClick={() => setView("history")}
                  className="flex items-center justify-center gap-3 p-6 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-all"
                >
                  <History className="w-6 h-6" />
                  <span className="font-medium text-lg">Event History</span>
                </button>
              </div>
            </>
          )}

          {view === "create" && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Event Subtitle"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newEvent.subtitle}
                  onChange={(e) => setNewEvent({ ...newEvent, subtitle: e.target.value })}
                />
                <textarea
                  placeholder="Event Description"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="4"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  />
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  />
                </div>


                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Candidates</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Candidate Name"
                      className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                    />
                    <button
                      onClick={handleAddCandidate}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-3 list-disc list-inside text-gray-700">
                    {newEvent.candidates.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCreateEvent}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={() => setView("main")}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "history" && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event History</h2>
              {events.length === 0 ? (
                <p className="text-gray-500">No events found.</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.subtitle}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.startDate} → {event.endDate}
                        </p>
                      </div>
                      <button
                        className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate(`/eventHistory/${event.id}`)}
                      >
                        More Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setView("main")}
                className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
