import React, { useState } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Target, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import SidebarAdmin from '../../components/SidebarAdmin';

export default function AdminAnalitik() {
  // Mock data analitik
  const [analytics] = useState({
    totalBooking: 1250,
    totalRevenue: 18750000,
    totalUsers: 450,
    avgRating: 4.8,
    weeklyBooking: [45, 52, 38, 65, 48, 72, 55],
    topFields: [
      { id: 1, name: 'Lapangan A', bookings: 125, revenue: 18750000 },
      { id: 2, name: 'Lapangan Premium A', bookings: 98, revenue: 14700000 },
      { id: 3, name: 'Lapangan VIP Elite', bookings: 87, revenue: 13050000 },
      { id: 4, name: 'Lapangan Standard B', bookings: 65, revenue: 9750000 }
    ],
    bookingStatus: { confirmed: 950, pending: 200, cancelled: 100 }
  });

  const [dateRange, setDateRange] = useState('month');

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };

  const totalStatus = (analytics.bookingStatus.confirmed || 0) + (analytics.bookingStatus.pending || 0) + (analytics.bookingStatus.cancelled || 0);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Analitik</h1>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
            >
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Booking */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Booking</p>
                  <p className="text-4xl font-bold text-white">{analytics.totalBooking}</p>
                  <p className="text-green-400 text-sm mt-2">↑ 12% dari bulan lalu</p>
                </div>
                <Calendar className="text-purple-400" size={28} />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">Rp {(analytics.totalRevenue / 1000000).toFixed(1)}M</p>
                  <p className="text-green-400 text-sm mt-2">↑ 8% dari bulan lalu</p>
                </div>
                <DollarSign className="text-green-400" size={28} />
              </div>
            </div>

            {/* Total Users */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Users</p>
                  <p className="text-4xl font-bold text-white">{analytics.totalUsers}</p>
                  <p className="text-green-400 text-sm mt-2">↑ 15% dari bulan lalu</p>
                </div>
                <Users className="text-blue-400" size={28} />
              </div>
            </div>

            {/* Avg Rating */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Rata-rata Rating</p>
                  <p className="text-4xl font-bold text-white">{analytics.avgRating}</p>
                  <p className="text-yellow-400 text-sm mt-2">★★★★★ Excellent</p>
                </div>
                <Target className="text-yellow-400" size={28} />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Booking Chart */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Booking Per Hari (Minggu Ini)</h3>
                <BarChart3 className="text-cyan-400" size={24} />
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics.weeklyBooking.map((height, i) => {
                  const maxHeight = 100;
                  const percentage = (height / maxHeight) * 100;
                  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
                  
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t hover:opacity-80 transition" 
                        style={{ height: `${percentage}%`, minHeight: '4px' }}>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{dayNames[i]}</p>
                      <p className="text-xs text-gray-300 font-semibold">{height}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Status Pie Chart */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Status Booking</h3>
                <PieChartIcon className="text-pink-400" size={24} />
              </div>
              <div className="flex items-center justify-between">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" 
                      strokeDasharray={`${calculatePercentage(analytics.bookingStatus.confirmed, totalStatus) * 2.512} 251.2`}
                    />
                    <circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8" 
                      strokeDasharray={`${calculatePercentage(analytics.bookingStatus.pending, totalStatus) * 2.512} 251.2`}
                      strokeDashoffset={`-${calculatePercentage(analytics.bookingStatus.confirmed, totalStatus) * 2.512}`}
                    />
                    <circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" 
                      strokeDasharray={`${calculatePercentage(analytics.bookingStatus.cancelled, totalStatus) * 2.512} 251.2`}
                      strokeDashoffset={`-${(calculatePercentage(analytics.bookingStatus.confirmed, totalStatus) + calculatePercentage(analytics.bookingStatus.pending, totalStatus)) * 2.512}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{totalStatus}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Confirmed</p>
                      <p className="text-white font-semibold">{analytics.bookingStatus.confirmed} ({calculatePercentage(analytics.bookingStatus.confirmed, totalStatus)}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Pending</p>
                      <p className="text-white font-semibold">{analytics.bookingStatus.pending} ({calculatePercentage(analytics.bookingStatus.pending, totalStatus)}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Cancelled</p>
                      <p className="text-white font-semibold">{analytics.bookingStatus.cancelled} ({calculatePercentage(analytics.bookingStatus.cancelled, totalStatus)}%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Lapangan */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Top Lapangan Terlaris</h3>
            <div className="space-y-4">
              {analytics.topFields.map((field, idx) => (
                <div key={field.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{field.name}</p>
                      <p className="text-gray-400 text-sm">{field.bookings} booking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">Rp {(field.revenue / 1000000).toFixed(1)}M</p>
                    <p className="text-green-400 text-sm">↑ Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}