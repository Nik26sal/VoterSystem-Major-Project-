import React from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  const events = [
    {
      id: 1,
      title: "Student Council Election 2025",
      subheading: "Vote for your next student council representatives.",
      date: "Oct 22 - Oct 30, 2025",
      status: "Ongoing",
      description: "This election is to select the best student council representative for this year. Choose wisely and cast your vote for your preferred candidate.",
      candidates: ["Alice Johnson", "Bob Smith", "Charlie Davis"],

    },
    {
      id: 2,
      title: "TechFest Innovation Awards",
      subheading: "Choose the most innovative project of the year.",
      date: "Oct 20 - Oct 25, 2025",
      status: "Ongoing",
      description: "This election is to select the best student council representative for this year. Choose wisely and cast your vote for your preferred candidate.",
      candidates: ["David Lee", "Eva Martinez", "Frank Wilson"]
    },
    {
      id: 3,
      title: "Photography Contest",
      subheading: "Vote for the best capture among 20+ talented photographers.",
      date: "Oct 18 - Oct 24, 2025",
      description: "This election is to select the best student council representative for this year. Choose wisely and cast your vote for your preferred candidate.",
      status: "Closed",
    },
  ];
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));
  const handleVote = (candidate) => {
    alert(`You voted for ${candidate} in ${event.title}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">{event.title}</h1>
      <h2 className="text-xl font-medium text-gray-700 mb-4">{event.subheading}</h2>
      <p className="text-gray-600 mb-6">{event.description}</p>

      <div className="space-y-4">
        {event.candidates.map((candidate, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white rounded-lg shadow p-4 border"
          >
            <span className="text-gray-800 font-medium">{candidate}</span>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => handleVote(candidate)}
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
