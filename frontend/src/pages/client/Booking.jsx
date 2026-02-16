import React, { useState, useEffect } from "react";
import { Calendar, Clock, Users, CreditCard, CheckCircle, ArrowRight, User, Phone, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable no-unused-vars */
//ini jgnn di ganti ya
const FIELD_DATA = [
  {
    id: 1,
    name: "Lapangan Premium A",
    type: "Indoor AC Premium",
    price: 150000,
    location: "Indoor AC Premium"
  },
  {
    id: 2,
    name: "Lapangan Standard B", 
    type: "Indoor Standard",
    price: 100000,
    location: "Indoor Standard"
  },
  {
    id: 3,
    name: "Lapangan VIP Elite",
    type: "Indoor VIP Premium", 
    price: 200000,
    location: "Indoor VIP Premium"
  }
]

export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [playerCount, setPlayerCount] = useState(10);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({

    // lebokno db
    name: "",
    phone: "",
    email: "",
    notes: ""
  })

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fieldId = location.state?.fieldId;
    if (fieldId) {
      const field = FIELD_DATA.find(f => f.id === fieldId);
      setSelectedField(field);
    } else {
      navigate('/')
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await submitBooking();
    setIsLoading(false);
  };


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const BASE_URL = 'http://localhost:8000/api';

const submitBooking = async () => {
  const [hour, minute] = selectedTime.split(":").map(Number);
  const endHour = hour + duration;
  const payload = {
    field_name: selectedField.name,
    location: selectedField.location,
    date: selectedDate,
    start_time: selectedTime,
   end_time: `${String(endHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    total_price: calculateTotal(),
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    notes: formData.notes,
  };

  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Gagal menyimpan booking:", data);
      alert("Gagal menyimpan booking");
      return;
    }

    alert("Booking berhasil disimpan!");
    navigate("/booking-history"); // atau arahkan ke halaman lain
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat menyimpan booking");
  }
};


  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const calculateTotal = () => {
  return selectedField ? selectedField.price * duration : 0;
};

// Tambahan validasi form
const isFormValid =
  selectedDate.trim() !== "" &&
  selectedTime.trim() !== "" &&
  formData.name.trim() !== "" &&
  formData.phone.trim() !== "" &&
  formData.email.trim() !== "";

  const getComputedStatus = (booking) => {
  const now = new Date()

  const start = new Date(`${booking.date}T${booking.start_time}`)
  const end = new Date(`${booking.date}T${booking.end_time}`)

  if (booking.status === "cancelled") return "cancelled"

  if (now < start) return "upcoming"
  if (now >= start && now <= end) return "ongoing"
  if (now > end) return "completed"

  return booking.status
}

  if (!selectedField) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/50">
            <Calendar className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-[#1e1b4b]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-blue-600/90"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-2">Detail Booking</h2>
              <p className="text-purple-100">Isi Informasi dibawah ini untuk melakukan Pemesanan</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12 blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl"></div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-3">Kategori Pesanan</label>
                  <div className="p-4 border-2 border-purple-500/50 bg-purple-900/40 rounded-xl hover:border-purple-400/70 transition-all duration-300 shadow-lg shadow-purple-900/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-white">{selectedField.name}</h3>
                        <p className="text-sm text-purple-200">{selectedField.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-300">Rp {selectedField.price.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-purple-400">per Jam</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Pilih Tanggal Booking
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-gray-900/50 text-white hover:bg-gray-900/70 focus:bg-gray-900/70 shadow-inner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-3">
                    <Clock className="inline w-4 h-4 mr-2" />
                    Pilih Durasi Booking
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-lg border transition-all duration-200 font-medium ${
                          selectedTime === time
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-lg shadow-purple-500/50 scale-105'
                            : 'bg-gray-900/50 text-purple-200 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 hover:scale-105'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Durasi (Jam)</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white hover:bg-gray-800 focus:bg-gray-800"
                    >
                      {[1, 2, 3, 4].map(hour => (
                        <option key={hour} value={hour}>{hour} Jam{hour > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Pemain
                    </label>
                    <input
                      type="number"
                      value={playerCount}
                      onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                      min="2"
                      max="22"
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white hover:bg-gray-800 focus:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Informasi Kontak Penyewa</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="masukkan nama lengkap"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 hover:bg-gray-800 focus:bg-gray-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Nomor HP
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="masukkan no hp"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 hover:bg-gray-800 focus:bg-gray-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Masukkan Email"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 hover:bg-gray-800 focus:bg-gray-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pesan (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="permintaan khusus atau catatan"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 hover:bg-gray-800 focus:bg-gray-800 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ringkasan Pemesanan
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Kategori :</span>
                      <span className="font-medium text-white">{selectedField.name}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tanggal :</span>
                        <span className="font-medium text-white">{new Date(selectedDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Waktu :</span>
                        <span className="font-medium text-white">{selectedTime} - {String(parseInt(selectedTime.split(':')[0]) + duration).padStart(2, '0')}:00</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-300">Durasi :</span>
                      <span className="font-medium text-white">{duration} Jam{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pemain :</span>
                      <span className="font-medium text-white">{playerCount} Orang</span>
                    </div>
                    <hr className="border-purple-500/30" />
                    <div className="flex justify-between text-lg font-bold text-purple-400">
                      <span>Total:</span>
                      <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Konfirmasi pesanan</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Bantuan? {" "}
            <a href="tel:+62123456789" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
              +62 123 456 789
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}