import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

export default function AdminResults() {
  const { eventId } = useParams();
  const [results, setResults] = useState([]);
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/results/${eventId}`);
        setResults(res.data.results);
        setEventTitle(res.data.event);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load results");
      }
    };

    fetchResults();
  }, [eventId]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Results — {eventTitle}
        </h1>

        {results.length === 0 ? (
          <p>No votes recorded yet.</p>
        ) : (
          results.map((c) => (
            <div
              key={c.candidateId}
              className="flex justify-between p-4 border rounded-lg mb-3"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.party}</p>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {c.votes} votes
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
