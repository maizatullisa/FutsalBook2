import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Settings, Edit3, LogOut, Shield, Clock, Award } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    const handleLogout = () => {
    // hapus token / auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // kalau ada

    // redirect ke login
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal memuat data user:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
    {/* Header Section */}
      <section className="relative py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Profil Pengguna
        </h1>
              <p className="text-sm text-gray-400">Kelola informasi akun Anda</p>
          </div>
        </div>
      </section>

      {/* Profile Card */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-slate-950/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-purple-900/50">
          {/* Profile Header with Gradient */}
          <div className="relative h-24 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 bg-slate-950 rounded-full border-4 border-slate-950 shadow-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 px-4 pb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.name || "Nama Pengguna"}
              </h2>
              <div className="flex items-center justify-center space-x-2 text-purple-300">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-xs">Active Member</span>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-purple-950/50 to-violet-950/50 rounded-lg p-4 border border-purple-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-purple-300 mb-0.5">Email Address</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {user.email || "email@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Since Card */}
              <div className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 rounded-lg p-4 border border-purple-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-purple-300 mb-0.5">Member Since</p>
                    <p className="text-sm font-semibold text-white">
                      {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards - COMMENTED OUT */}
            {/* <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-600 mt-0.5">Bookings</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <p className="text-xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-600 mt-0.5">Hours</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <p className="text-xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-600 mt-0.5">Active</p>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {/* Edit Profile - COMMENTED OUT */}
              {/* <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Profile</span>
              </button> */}
              
                <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}