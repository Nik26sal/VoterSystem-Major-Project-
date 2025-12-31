import React, { useEffect, useState } from "react";
import { Calendar, PlusCircle, History } from "lucide-react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { user, createEvent, adminEvents, adminEventsLoading, getAdminEvents } =
    useAuth();

  const [view, setView] = useState("main");

  /* ================= FETCH ADMIN EVENTS ================= */
  useEffect(() => {
    if (user?.id) {
      getAdminEvents(user.id);
    }
  }, [user?.id]);

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
    toast.error("Name, Email, Age and Party Name are required");
    return;
  }

  const ageNum = Number(age);
  if (ageNum <= 16 || ageNum >= 100) {
    toast.error("Candidate age must be greater than 16 and less than 100");
    return;
  }

  if (countWords(partyName) > 10) {
    toast.error("Party name cannot exceed 10 words");
    return;
  }

  setNewEvent((prev) => ({
    ...prev,
    candidates: [...prev.candidates, { ...candidate, age: ageNum }],
  }));

  setCandidate({
    name: "",
    email: "",
    age: "",
    partyName: "",
    description: "",
  });
};
const countWords = (text = "") =>
  text.trim().split(/\s+/).filter(Boolean).length;


  /* ================= REMOVE CANDIDATE ================= */
  const handleRemoveCandidate = (index) => {
    setNewEvent((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index),
    }));
  };

  /* ================= CREATE EVENT ================= */
const handleCreateEvent = async () => {
  const { title, subtitle, description, startAt, endAt, candidates } =
    newEvent;

  if (!title || !startAt || !endAt) {
    toast.error("Title, Start time and End time are required");
    return;
  }

  if (countWords(title) > 10) {
    toast.error("Title cannot exceed 10 words");
    return;
  }

  if (subtitle && countWords(subtitle) > 20) {
    toast.error("Subtitle cannot exceed 20 words");
    return;
  }

  if (description && countWords(description) > 100) {
    toast.error("Description cannot exceed 100 words");
    return;
  }

  const now = new Date();
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  if (startDate < now) {
    toast.error("Starting date & time cannot be in the past");
    return;
  }

  if (endDate < startDate) {
    toast.error("Ending date & time cannot be before starting date");
    return;
  }

  if (candidates.length === 0) {
    toast.error("At least one candidate is required");
    return;
  }

  const data = {
    title,
    subtitle,
    description,
    startAt: startDate,
    endAt: endDate,
    allowedEmails: newEvent.allowedEmails
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean),
    whitelistVoters: newEvent.whitelistVoters
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
    candidates,
    createdBy: user.id,
  };

  try {
    await createEvent(data);
    await getAdminEvents(user.id);

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
    toast.success("Event created successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to create event");
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
                  <p className="text-2xl font-semibold">
                    {adminEventsLoading ? "..." : adminEvents.length}
                  </p>
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
                      setCandidate({ ...candidate, partyName: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleAddCandidate}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add Candidate
                </button>

                {newEvent.candidates.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between mt-3 bg-white p-3 rounded-lg border"
                  >
                    <p>
                      {c.name} ({c.partyName})
                    </p>
                    <button
                      onClick={() => handleRemoveCandidate(i)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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

              {adminEventsLoading ? (
                <p className="text-gray-500">Loading events...</p>
              ) : adminEvents.length === 0 ? (
                <p className="text-gray-500">No events created yet</p>
              ) : (
                adminEvents.map((event) => (
                  <div
                    key={event._id}
                    className="p-4 bg-gray-50 border rounded-lg mb-4"
                  >
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.startAt).toLocaleString()} →{" "}
                      {new Date(event.endAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}

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
