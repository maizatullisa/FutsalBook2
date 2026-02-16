
import React, { useEffect, useState } from 'react'
import { TrendingUp, Eye, Users, Settings, HelpCircle, BarChart3, PieChart, Activity } from 'lucide-react';
// import NavbarAdmin from '../../components/NavbarAdmin';
import SidebarAdmin from '../../components/SidebarAdmin';
/* eslint-disable no-unused-vars */
const AdminDashboard = () => {
const [totalUsers, setTotalUsers] = React.useState(0)
const [bookingToday, setBookingToday] = useState(0)
const [lapanganTersedia, setLapanganTersedia] = useState(0)

React.useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setTotalUsers(data.data.length)

        console.log("DATA USERS:", data.data)
        console.log("TOTAL USERS:", data.data.length)
      }
    } catch (err) {
      console.error("Gagal ambil user", err)
    }
  }

  fetchUsers()
  
  const fetchBookingsToday = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/bookings-today", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })

    const data = await res.json()
    console.log("BOOKINGS API:", data)

    if (res.ok && data.success) {
      setBookingToday(data.data.length)
      console.log("BOOKINGS TODAY:", data.data.length)
    }
  } catch (err) {
    console.error("Gagal ambil booking", err)
  }
}
  fetchBookingsToday()

const fetchLapanganTersedia = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/admin/lapangan/today", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })

    const data = await res.json()
    console.log("LAPANGAN API:", data)

    if (res.ok && data.success) {
      const availableCount = data.data.filter(
        (item) => item.available === true
      ).length

      setLapanganTersedia(availableCount)
    }
  } catch (err) {
    console.error("Gagal ambil lapangan", err)
  }
}

  fetchLapanganTersedia()
}, [])



const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
    <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Selamat Datang Admin !</h1>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
      </div>
    </div>

        {/* Body Content */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Penjualan</p>
                  <p className="text-3xl font-bold text-white">Rp. 1.500.000</p>
                  {/* <p className="text-green-400 text-sm mt-2">✓ 12,234 +10.2% hari ini</p> */}
                </div>
                <TrendingUp className="text-purple-400" size={24} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Pesanan</p>
                  <p className="text-3xl font-bold text-white">28</p>
                  {/* <p className="text-green-400 text-sm mt-2">✓ 2 +2.2% hari ini</p> */}
                </div>
                <Activity className="text-blue-400" size={24} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Pengguna</p>
                  <p className="text-3xl font-bold text-white">{totalUsers}</p>
                  {/* <p className="text-gray-400 text-sm mt-2">Terjadwal hari ini</p> */}
                </div>
                <BarChart3 className="text-cyan-400" size={24} />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            {/* <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Statistik</h3>
                <button className="text-gray-400 hover:text-white">⋯</button>
              </div>
              <div className="h-64 flex items-end justify-between">
                {[40, 50, 35, 60, 45, 70, 55].map((height, i) => (
                  <div
                    key={i}
                    className="w-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div> */}
            </div>

            {/* Pie Chart */}
            {/* <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Pembayaran</h3>
                <button className="text-gray-400 hover:text-white">⋯</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="8" strokeDasharray="75.4 251.2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="8" strokeDasharray="62.8 251.2" strokeDashoffset="-75.4" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="8" strokeDasharray="113.04 251.2" strokeDashoffset="-138.2" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">$5,624,212</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Selesai: 40%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-300">Pending: 25%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-300">Lainnya: 35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pengunjung */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Pengunjung</h3>
                <button className="text-gray-400 hover:text-white">⋯</button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Pengunjung Hari Ini</span>
                    <span>{totalUsers}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Overview</h3>
                <button className="text-gray-400 hover:text-white">⋯</button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Total Booking Hari ini</span>
                  <span className="font-bold text-white">{bookingToday}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Lapangan Aktif</span>
                  <span className="font-bold text-white">{lapanganTersedia}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Rata-rata Rating</span>
                  <span className="font-bold text-white">4.8/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard