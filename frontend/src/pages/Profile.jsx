import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Lock } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
          
          {/* Profile Info */}
          <div className="space-y-6">
            {/* Username */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-lg font-semibold text-gray-800">{profile.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-800">{profile.role}</p>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="text-lg font-semibold text-gray-800">••••••••</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}