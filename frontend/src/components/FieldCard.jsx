import React from "react"
import { CheckCircle, XCircle, MapPin } from "lucide-react"

const STATUS_CONFIG = {
  available: {
    icon: CheckCircle,
    color: "text-violet-400",
    bg: "bg-violet-950/50",
    border: "border-violet-400/30",
    gradient: "from-violet-500/10 to-fuchsia-500/10",
    glow: "from-violet-500/20 to-fuchsia-500/20"
  },
  unavailable: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-950/50",
    border: "border-red-400/30",
    gradient: "from-red-500/10 to-red-600/5",
    glow: "from-red-500/20 to-pink-500/20"
  }
}

function FieldCard({ field, onBookingClick }) {
  const isAvailable = field.status === "Tersedia"
  const statusConfig = isAvailable ? STATUS_CONFIG.available : STATUS_CONFIG.unavailable
  const StatusIcon = statusConfig.icon

  const handleBookingClick = () => {
    if (isAvailable && onBookingClick) {
      onBookingClick(field.id)
    }
  }

  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${statusConfig.glow} rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-lg`} />

    <div className="relative bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-purple-900/50 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-slate-950/30 to-indigo-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(109,40,217,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_70%)]" />

        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
             <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:via-fuchsia-200 group-hover:to-pink-200 transition-all duration-500">
                {field.name}
              </h2>

              <div className="flex items-center space-x-3 mt-2">
                <div className="flex items-center space-x-1">
                 <MapPin className="w-4 h-4 text-violet-400" />
                 <span className="text-sm text-purple-300 font-medium">{field.type}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {field.price}
                </span>
              </div>
            </div>

            <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl ${statusConfig.bg} ${statusConfig.border} border-2 backdrop-blur-sm shadow-lg`}>
              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
              <span className={`text-sm font-bold ${statusConfig.color}`}>{field.status}</span>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="text-7xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                ⚽
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        <div className="relative px-6 pb-6 space-y-5">
         <p className="text-gray-300 leading-relaxed text-sm">{field.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {field.facilities.map((facility, index) => {
              const Icon = facility.icon
              return (
                <div
                key={`facility-${index}`}
                className="flex items-center space-x-2 p-2.5 rounded-xl bg-purple-200/70 backdrop-blur-sm border border-purple-300/60 hover:bg-purple-200/90 transition-all duration-300"
              >
                <Icon className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-semibold text-purple-900">{facility.name}</span>
              </div>
              )
            })}
          </div>

          <div className="bg-purple-100/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-300/70">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-900">{field.capacity}</div>
                <div className="text-xs text-purple-700 font-medium">Kapasitas</div>
              </div>
              <div className="text-center border-x border-purple-300">
                <div className="text-lg font-bold text-purple-900">{field.currentBookings}</div>
                <div className="text-xs text-purple-700 font-medium">Terbooking</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${isAvailable ? "text-violet-600" : "text-red-600"}`}>
                  {isAvailable ? field.availableSlots : "0"}
                </div>
                <div className="text-xs text-purple-700 font-medium">Tersedia</div>
              </div>
            </div>
          </div>

          <button
          onClick={handleBookingClick}
          disabled={!isAvailable}
         className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
              isAvailable
                ? "bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white hover:shadow-xl hover:shadow-violet-500/50 hover:scale-105 active:scale-95"
                : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isAvailable && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            )}
            <span className="relative flex items-center justify-center space-x-2">
              <span>{isAvailable ? "🎯" : "❌"}</span>
              <span>{isAvailable ? "Book Sekarang" : "Tidak Tersedia"}</span>
            </span>
          </button>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-1000" />
      </div>
    </div>
  )
}

export default FieldCard
