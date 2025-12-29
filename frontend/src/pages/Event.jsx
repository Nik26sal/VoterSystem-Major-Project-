import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import api from "../api/api";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/event/${id}`);
        setEvent(res.data.event); 
      } catch (err) {
        console.error(err);
        toast.error("not authorized to view this event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  /* ================= VOTE HANDLER ================= */
  const handleVote = (candidateId) => {
    toast.success(`You voted for candidate ID: ${candidateId}`);
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading event...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="pt-24 text-center text-red-500">
        {error || "Event not found"}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-3xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        {event.title}
      </h1>

      <h2 className="text-xl font-medium text-gray-700 mb-4">
        {event.subtitle}
      </h2>

      <p className="text-gray-600 mb-4">{event.description}</p>

      <p className="text-sm text-gray-500 mb-6">
        📅 {new Date(event.startAt).toLocaleString()} →{" "}
        {new Date(event.endAt).toLocaleString()}
      </p>

      <span
        className={`inline-block mb-6 px-4 py-1 rounded-full text-sm font-medium ${
          event.status === "ongoing"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {event.status}
      </span>

      {/* ================= CANDIDATES ================= */}
      <div className="space-y-4">
        {event.candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="flex justify-between items-center bg-white rounded-lg shadow p-4 border"
          >
            <div>
              <p className="text-gray-800 font-semibold">
                {candidate.name}
              </p>
              <p className="text-sm text-gray-500">
                Party: {candidate.party || candidate.partyName}
              </p>
            </div>

            <button
              disabled={event.status !== "ongoing"}
              onClick={() => handleVote(candidate._id)}
              className={`px-4 py-2 rounded-md text-white ${
                event.status === "ongoing"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
