import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function VoterDashboard() {
  const { user } = useAuth();
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MY VOTES ================= */
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/my-votes",
          { withCredentials: true } 
        );
        setVotes(res.data.votes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchVotes();
  }, [user?.id]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Voter Dashboard
          </h1>

          {/* TOTAL PARTICIPATION */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-8">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Events Participated</p>
              <p className="text-2xl font-semibold text-gray-800">
                {votes.length}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Voting History
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : votes.length === 0 ? (
            <p className="text-gray-500">You haven't voted in any events yet.</p>
          ) : (
            <div className="space-y-4">
              {votes.map((vote) => (
                <EventCard key={vote._id} vote={vote} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= EVENT CARD ================= */
function EventCard({ vote }) {
  const event = vote.event;
  const candidate = vote.candidate;

  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.subtitle}</p>
      <p className="text-sm text-gray-600">
        {new Date(event.startAt).toLocaleString()} →{" "}
        {new Date(event.endAt).toLocaleString()}
      </p>

      <p className="text-green-600 font-medium mt-2">
        🗳️ You voted: {candidate.name} ({candidate.partyName})
      </p>

      {event.status === "closed" && (
        <WinnerDisplay eventId={event._id} />
      )}
    </div>
  );
}

/* ================= WINNER DISPLAY ================= */
function WinnerDisplay({ eventId }) {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/results/${eventId}`,
          { withCredentials: true }
        );

        const sorted = res.data.results.sort((a, b) => b.votes - a.votes);
        setWinner(sorted[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [eventId]);

  if (!winner) return null;

  return (
    <p className="text-blue-600 font-semibold">
      🏆 Winner: {winner.name} ({winner.votes} votes)
    </p>
  );
}
