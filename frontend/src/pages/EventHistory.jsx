import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User, Award, ListChecks, CheckCircle } from "lucide-react";

export default function EventHistory() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const dummyEvents = [
    {
      id: "1",
      title: "Annual Tech Fest",
      subtitle: "Innovation & AI",
      description: "A three-day festival showcasing tech innovations and AI workshops. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      startDate: "2025-03-10",
      endDate: "2025-03-12",
      candidates: [
        { name: "Alice", votes: 120 },
        { name: "Bob", votes: 95 },
        { name: "Charlie", votes: 130 },
      ],
    },
    {
      id: "2",
      title: "Cultural Night",
      subtitle: "Music & Art",
      description: "A night full of performances, art exhibitions, and cultural showcases.",
      startDate: "2025-02-05",
      endDate: "2025-02-05",
      candidates: [
        { name: "Dave", votes: 80 },
        { name: "Eve", votes: 100 },
      ],
    },
  ];

  useEffect(() => {
    const foundEvent = dummyEvents.find((e) => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  if (!event) {
    return (
      <div className="pt-20 min-h-screen flex justify-center items-center text-gray-600">
        Event not found.
      </div>
    );
  }

  const totalVotes = event.candidates.reduce((sum, c) => sum + c.votes, 0);
  const winner = event.candidates.reduce((prev, current) =>
    current.votes > prev.votes ? current : prev
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
              <h2 className="text-xl text-gray-500">{event.subtitle}</h2>
            </div>
          </div>

          <p className="text-gray-700 mb-6 flex items-start gap-2">
            <ListChecks className="w-5 h-5 text-gray-500 mt-0.5" /> 
            <span>{event.description}</span>
          </p>

          <div className="flex flex-wrap gap-6 mb-6">
            <p className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-green-600" /> 
              <span><span className="font-semibold">Start:</span> {event.startDate}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-red-600" /> 
              <span><span className="font-semibold">End:</span> {event.endDate}</span>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Candidates & Votes
            </h3>
            <ul className="space-y-2">
              {event.candidates.map((c, idx) => (
                <li
                  key={idx}
                  className={`flex justify-between p-3 rounded-lg border ${
                    c.name === winner.name ? "bg-yellow-50 border-yellow-400" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.votes} votes</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="flex items-center gap-2 text-gray-800 font-medium">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Total Votes: <span className="font-bold">{totalVotes}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-800 font-medium">
              <Award className="w-5 h-5 text-yellow-500" />
              Winning Candidate: <span className="font-bold">{winner.name}</span> ({winner.votes} votes)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
