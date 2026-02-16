import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiWifi,
  FiCamera,
  FiShield,
  FiUsers,
  FiClock
} from "react-icons/fi"

import FieldCard from "../../components/FieldCard"

const FIELD_DATA = [
  {
    id: 1,
    name: "Lapangan Premium A",
    type: "Indoor AC Premium",
    status: "Tersedia",
    description:
      "Lapangan indoor premium dengan AC, pencahayaan LED, dan lantai vinyl berkualitas. Cocok untuk turnamen dan latihan serius.",
    price: "Rp 150.000/jam",
    capacity: "10-14 orang",
    currentBookings: 0,
    availableSlots: 8,
    facilities: [
      { icon: FiWifi, name: "WiFi Gratis" },
      { icon: FiCamera, name: "CCTV" },
      { icon: FiShield, name: "Security 24h" },
      { icon: FiUsers, name: "Ruang Ganti" }
    ]
  },
  {
    id: 2,
    name: "Lapangan Standard B",
    type: "Indoor Standard",
    status: "Tersedia",
    description:
      "Lapangan indoor dengan ventilasi baik dan pencahayaan optimal. Cocok untuk bermain santai.",
    price: "Rp 100.000/jam",
    capacity: "10-14 orang",
    currentBookings: 2,
    availableSlots: 6,
    facilities: [
      { icon: FiWifi, name: "WiFi Gratis" },
      { icon: FiCamera, name: "CCTV" },
      { icon: FiUsers, name: "Ruang Ganti" },
      { icon: FiClock, name: "24 Jam" }
    ]
  },
  {
    id: 3,
    name: "Lapangan VIP Elite",
    type: "Indoor VIP Premium",
    status: "Tersedia",
    description:
      "Lapangan VIP dengan tribun, sound system, dan layanan premium. Ideal untuk acara spesial.",
    price: "Rp 200.000/jam",
    capacity: "10-14 orang",
    currentBookings: 1,
    availableSlots: 7,
    facilities: [
      { icon: FiWifi, name: "WiFi Premium" },
      { icon: FiCamera, name: "Live Stream" },
      { icon: FiShield, name: "VIP Security" },
      { icon: FiUsers, name: "VIP Lounge" }
    ]
  }
]

const TOTAL_SLOTS = 8

export default function Home() {
  const [fields, setFields] = useState(FIELD_DATA)
  const [bookingsToday, setBookingsToday] = useState([])
  const navigate = useNavigate()

  console.log("FIELDS UPDATED:", fields)


    useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/bookings-today", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const today = new Date().toISOString().split("T")[0]

        const todayBookings = data.data.filter(
          booking => booking.date === today
        )

        setBookingsToday(todayBookings)

        setFields(prevFields =>
        prevFields.map(field => {
          const bookingCount = todayBookings.filter(
            booking => booking.field_name === field.name
          ).length

          const available = TOTAL_SLOTS - bookingCount

          return {
            ...field,
            currentBookings: bookingCount,
            availableSlots: available,
            status: available > 0 ? "Tersedia" : "Penuh"
          }
        })
      )

      }
    } catch (err) {
      console.error("Gagal ambil booking:", err)
    }
  }

  fetchBookings()
}, [])

  const handleBookingClick = fieldId => {
    navigate("/booking", { state: { fieldId } })
  }

  console.log("BOOKING HARI INI:", bookingsToday)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Premium Futsal
            </span>
            <br />
            <span className="text-gray-800">Experience</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nikmati pengalaman futsal terbaik dengan fasilitas premium dan sistem booking real-time.
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              <span>Live Status Updates</span>
            </div>
            <span>•</span>
            <span>24/7 Available</span>
            <span>•</span>
            <span>Instant Booking</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pilih Lapangan Favorit Anda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Semua lapangan dilengkapi fasilitas modern dan sistem booking real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map(field => (
            <FieldCard
              key={field.id}
              field={field}
              onBookingClick={handleBookingClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}