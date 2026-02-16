import React from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
   <footer className="bg-slate-950/95 backdrop-blur-xl text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 opacity-0 animate-slide-in-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">⚽</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FutsalBook
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Platform booking lapangan futsal terpercaya dengan sistem reservasi yang mudah dan cepat
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 opacity-0 animate-slide-in-up">
            <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              {[
                { icon: Mail, text: "info@futsalbook.com" },
                { icon: Phone, text: "+62 812-3456-7890" },
                { icon: MapPin, text: "Madiun, Jawa Timur" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-all duration-200 cursor-pointer group hover:translate-x-1"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 opacity-0 animate-slide-in-right">
            {/* Kosong untuk saat ini, bisa diisi link navigasi */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 opacity-0 animate-fade-in-delayed">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 FutsalBook. All rights reserved
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm hover:scale-105 transition-transform duration-200">
              {/* Optional content */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-delayed {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out 0.2s forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out 0.3s forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.4s forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.6s ease-out 0.5s forwards;
        }
      `}</style>
    </footer>
  )
}