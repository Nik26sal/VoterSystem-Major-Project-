export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white px-8 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700">
          About VoterX
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          A Secure and Transparent Blockchain-Based Voting System
        </p>
      </div>
      <div className="mt-12 max-w-5xl mx-auto bg-blue-50 p-10 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-600">
          About the Application
        </h2>

        <p className="mt-4 text-gray-700 leading-relaxed">
          <strong>VoterX</strong> is a decentralized voting application built using 
          <strong> Blockchain and MERN technology</strong>. The platform is designed 
          to provide a secure, transparent, and tamper-proof voting process for 
          institutes and organizations.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Blockchain ensures vote immutability and transparency, while the MERN
          stack delivers a scalable, efficient, and user-friendly interface for
          administrators and voters.
        </p>
      </div>
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Our Team
        </h2>

        <p className="text-center text-gray-600 mt-3">
          VoterX was developed by a team of six members
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {[
            { name: "Nikhil Bansal", email: "nikhil.bansal@voterx.com", img: "https://i.pravatar.cc/150?img=11" },
            { name: "Puspendar Kumar", email: "puspendar.kumar@voterx.com", img: "https://i.pravatar.cc/150?img=12" },
            { name: "Aryan Jain", email: "aryan.jain@voterx.com", img: "https://i.pravatar.cc/150?img=14" },
            { name: "Arun Kumar", email: "arun.kumar@voterx.com", img: "https://i.pravatar.cc/150?img=15" },
            { name: "Divyanshi Gupta", email: "divyanshi.gupta@voterx.com", img: "https://i.pravatar.cc/150?img=16" },
            { name: "Harshdeep Singh", email: "harshdeep.singh@voterx.com", img: "https://i.pravatar.cc/150?img=17" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
              />
              <h3 className="text-xl font-semibold text-blue-600">
                {member.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                📧 {member.email}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
