import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-blue-50 p-10 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Contact VoterX
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Choose how you want to access the VoterX platform
        </p>
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600">
            For Institutes / Admin Access
          </h2>

          <p className="mt-3 text-gray-600">
            If your institute or organization wants to use <strong>VoterX</strong> 
            and you wish to act as an <strong>Admin</strong>, please send an email 
            to our team with the required details mentioned below.
          </p>

          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium mb-2">
              📌 Please include the following information:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li><strong>Name of the Institute</strong></li>
              <li><strong>Official Email Address</strong></li>
              <li><strong>Password you want</strong></li>
            </ul>
          </div>

          <p className="mt-4 text-gray-700 font-medium">
            📧 Email:{" "}
            <span className="text-blue-600 font-semibold">
              bansalnikhil750@gmail.com
            </span>
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Our team will review your request and provide admin credentials
            to the official email address after approval.
          </p>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600">
            For Voters
          </h2>

          <p className="mt-3 text-gray-600">
            If you are a voter from a registered institute, you can directly
            create your account and participate in elections.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up as Voter
          </button>
        </div>

      </div>
    </div>
  );
}
