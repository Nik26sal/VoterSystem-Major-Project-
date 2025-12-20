import React, { useEffect, useState } from "react";
import Event from "../Components/Event";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { allEvents } = useAuth(); // function
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await allEvents();

        if (Array.isArray(res)) {
          setEvents(res);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    const interval = setInterval(fetchEvents, 20000);

    return () => clearInterval(interval);
  }, [allEvents]); 

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🗳️ Voting Events
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading events...</p>
        )}

        {/* No Events */}
        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500">
            No events available
          </p>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
