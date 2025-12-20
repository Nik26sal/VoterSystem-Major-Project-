import React, { useState } from "react";
import { Calendar, PlusCircle, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, createEvent } = useAuth();

  const [view, setView] = useState("main");
  const [events, setEvents] = useState([]);

  /* ================= EVENT STATE ================= */
  const [newEvent, setNewEvent] = useState({
    title: "",
    subtitle: "",
    description: "",
    startAt: "",
    endAt: "",
    allowedEmails: "",
    whitelistVoters: "",
    candidates: [],
  });

  /* ================= CANDIDATE STATE ================= */
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    age: "",
    partyName: "",
    description: "",
  });

  /* ================= ADD CANDIDATE ================= */
  const handleAddCandidate = () => {
    const { name, email, age, partyName } = candidate;

    if (!name || !email || !age || !partyName) {
      alert("Name, Email, Age and Party Name are required");
      return;
    }

    setNewEvent((prev) => ({
      ...prev,
      candidates: [...prev.candidates, candidate],
    }));

    setCandidate({
      name: "",
      email: "",
      age: "",
      partyName: "",
      description: "",
    });
  };

  /* ================= REMOVE CANDIDATE ================= */
  const handleRemoveCandidate = (index) => {
    setNewEvent((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index),
    }));
  };

  /* ================= CREATE EVENT ================= */
  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.startAt || !newEvent.endAt) {
      alert("Title, Start time and End time are required");
      return;
    }

    const data = {
      title: newEvent.title,
      subtitle: newEvent.subtitle,
      description: newEvent.description,
      startAt: new Date(newEvent.startAt),
      endAt: new Date(newEvent.endAt),
      allowedEmails: newEvent.allowedEmails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
      whitelistVoters: newEvent.whitelistVoters
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      candidates: newEvent.candidates,
      createdBy: user.id, // ADMIN ID
    };

    try {
      await createEvent(data);

      setEvents((prev) => [...prev, data]);

      setNewEvent({
        title: "",
        subtitle: "",
        description: "",
        startAt: "",
        endAt: "",
        allowedEmails: "",
        whitelistVoters: "",
        candidates: [],
      });

      setView("main");
      alert("Event created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* ================= MAIN ================= */}
          {view === "main" && (
            <>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-8">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-semibold">{events.length}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setView("create")}
                  className="flex items-center justify-center gap-3 p-6 bg-blue-600 text-white rounded-lg"
                >
                  <PlusCircle /> Create New Event
                </button>

                <button
                  onClick={() => setView("history")}
                  className="flex items-center justify-center gap-3 p-6 bg-green-600 text-white rounded-lg"
                >
                  <History /> Event History
                </button>
              </div>
            </>
          )}

          {/* ================= CREATE ================= */}
          {view === "create" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Create New Event</h2>

              <input
                placeholder="Event Title"
                className="w-full p-3 border rounded-lg"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />

              <input
                placeholder="Event Subtitle"
                className="w-full p-3 border rounded-lg"
                value={newEvent.subtitle}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, subtitle: e.target.value })
                }
              />

              <textarea
                placeholder="Event Description"
                className="w-full p-3 border rounded-lg"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />

              <div className="flex gap-4">
                <input
                  type="datetime-local"
                  className="w-full p-3 border rounded-lg"
                  value={newEvent.startAt}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startAt: e.target.value })
                  }
                />
                <input
                  type="datetime-local"
                  className="w-full p-3 border rounded-lg"
                  value={newEvent.endAt}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, endAt: e.target.value })
                  }
                />
              </div>

              <textarea
                placeholder="Allowed Emails (comma separated)"
                className="w-full p-3 border rounded-lg"
                value={newEvent.allowedEmails}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, allowedEmails: e.target.value })
                }
              />

              <textarea
                placeholder="Whitelist Voters (comma separated)"
                className="w-full p-3 border rounded-lg"
                value={newEvent.whitelistVoters}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    whitelistVoters: e.target.value,
                  })
                }
              />

              {/* ================= CANDIDATES ================= */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Add Candidates</h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    placeholder="Candidate Name"
                    className="p-3 border rounded-lg"
                    value={candidate.name}
                    onChange={(e) =>
                      setCandidate({ ...candidate, name: e.target.value })
                    }
                  />

                  <input
                    placeholder="Email"
                    className="p-3 border rounded-lg"
                    value={candidate.email}
                    onChange={(e) =>
                      setCandidate({ ...candidate, email: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Age"
                    className="p-3 border rounded-lg"
                    value={candidate.age}
                    onChange={(e) =>
                      setCandidate({ ...candidate, age: e.target.value })
                    }
                  />

                  <input
                    placeholder="Party Name"
                    className="p-3 border rounded-lg"
                    value={candidate.partyName}
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        partyName: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Description"
                    className="p-3 border rounded-lg md:col-span-2"
                    value={candidate.description}
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  onClick={handleAddCandidate}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add Candidate
                </button>

                {/* ===== ADDED CANDIDATES LIST ===== */}
                {newEvent.candidates.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {newEvent.candidates.map((c, index) => (
                      <div
                        key={index}
                        className="flex justify-between bg-white border rounded-lg p-3"
                      >
                        <div>
                          <p className="font-semibold">
                            {c.name} ({c.age})
                          </p>
                          <p className="text-sm">{c.email}</p>
                          <p className="text-sm text-gray-600">
                            Party: {c.partyName}
                          </p>
                          {c.description && (
                            <p className="text-sm text-gray-500">
                              {c.description}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemoveCandidate(index)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCreateEvent}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Create Event
                </button>

                <button
                  onClick={() => setView("main")}
                  className="bg-gray-300 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ================= HISTORY ================= */}
          {view === "history" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Event History</h2>

              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border rounded-lg mb-4"
                >
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.startAt).toLocaleString()} →{" "}
                    {new Date(event.endAt).toLocaleString()}
                  </p>
                </div>
              ))}

              <button
                onClick={() => setView("main")}
                className="bg-gray-300 px-6 py-3 rounded-lg"
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
