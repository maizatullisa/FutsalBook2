import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Phone } from 'lucide-react';
import SidebarAdmin from '../../components/SidebarAdmin';

export default function AdminBooking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [viewMode, setViewMode] = useState('week'); // 'week' atau 'month'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8000/api/admin/bookings", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json"
      }
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setBookings(data.data);
      console.log("BOOKINGS:", data.data);
    } else {
      console.error("Response error:", data);
    }
  } catch (err) {
    console.error("Gagal ambil booking", err);
  } finally {
    setLoading(false);
  }
};


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getWeekDates = (date) => {
    const week = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();

    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(first + i));
      week.push(new Date(day));
    }
    return week;
  };

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isToday = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === new Date(date).setHours(0, 0, 0, 0);
    });
  };

  const dates = viewMode === 'week' ? getWeekDates(currentDate) : getMonthDates(currentDate);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Booking</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Cari..."
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
            />
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Controls */}
          <div className="flex justify-between items-center backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => setViewMode('week')}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'week'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Minggu
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'month'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Bulan
              </button>
            </div>

            <div className="text-white font-semibold">
              {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {dates.map((date, idx) => {
              const dateBookings = getBookingsForDate(date);
              const isTodayDate = isToday(date);

              return (
                <div
                  key={idx}
                  className={`backdrop-blur-xl border rounded-2xl p-4 min-h-96 flex flex-col ${
                    isTodayDate
                      ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/15'
                  }`}
                >
                  {/* Header Tanggal */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <p className={`text-sm font-semibold ${isTodayDate ? 'text-purple-400' : 'text-gray-400'}`}>
                      {dayNames[date.getDay()]}
                    </p>
                    <p className={`text-2xl font-bold ${isTodayDate ? 'text-white' : 'text-gray-300'}`}>
                      {date.getDate()}
                    </p>
                    {isTodayDate && (
                      <p className="text-xs text-purple-300 mt-1">Hari Ini</p>
                    )}
                  </div>

                  {/* Bookings */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {dateBookings.length > 0 ? (
                      dateBookings.map((booking, bidx) => (
                        <div
                          key={bidx}
                          className={`p-3 rounded-xl border transition ${
                            isTodayDate
                              ? 'bg-purple-500/20 border-purple-400/50 hover:bg-purple-500/30'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <Clock size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-white">
                                {booking.start_time} - {booking.end_time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 mb-2">
                            <MapPin size={14} className="text-pink-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-300">  {booking.location || 'Lapangan'}</p>
                          </div>

                          <div className="flex items-start gap-2 mb-2">
                            <User size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-300"> {booking.user?.name || '-'}</p>
                          </div>

                          <div className="flex items-start gap-2">
                            <Phone size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-300">{booking.phone || '-'}</p>
                          </div>

                         <div className="mt-3 pt-3 border-t border-white/10">
                          <p className={`text-xs font-semibold ${
                            booking.computed_status === 'sedang berlangsung' ? 'text-green-400' :
                            booking.computed_status === 'akan datang' ? 'text-yellow-400' :
                            'text-gray-400'
                          }`}>
                            {booking.computed_status.toUpperCase()}
                          </p>
                        </div>

                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 text-center mt-8">Tidak ada booking</p>
                    )}
                  </div>

                  {/* Booking Count */}
                  {dateBookings.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-400">
                        {dateBookings.length} booking
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}