import React from 'react'
import Event from '../Components/Event'
export default function Home() {
  // Demo event data
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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Content */}
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🗳️ Voting Events
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
