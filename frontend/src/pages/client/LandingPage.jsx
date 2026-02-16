import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function KampoengGutsan() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [balls, setBalls] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const newBalls = Array.from({ length: 25 }).map(() => ({
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setBalls(newBalls);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black font-sans overflow-hidden relative">

      {/* 🔮 Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {balls.map((ball, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-2xl opacity-60"
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              background: `radial-gradient(circle at 30% 30%, ${ball.color}, transparent 70%)`,
              left: `${ball.left}%`,
              top: `${ball.top}%`,
              animation: `floatBall ${ball.duration}s ease-in-out ${ball.delay}s infinite alternate`,
            }}
          />
        ))}

        <style>{`
          @keyframes floatBall {
            0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
            50% { transform: translate(20px, -30px) scale(1.1); opacity: 1; }
            100% { transform: translate(-20px, 30px) scale(0.9); opacity: 0.6; }
          }
        `}</style>
      </div>

      {/* ⚽ Background Bola Futsal Besar */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* Efek Glow/Cahaya di sekitar gambar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-radial from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-gradient-radial from-orange-400/20 via-yellow-500/10 to-transparent rounded-full blur-2xl animate-glow"></div>
        </div>
        
        {/* Partikel Berkilau di sekitar gambar */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute sparkle"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Efek Ring/Lingkaran Cahaya */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[450px] h-[450px] border-4 border-purple-400/20 rounded-full animate-ring-1"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-4 border-pink-400/20 rounded-full animate-ring-2"></div>
        </div>
        
        <img
          src="/images/soccerr.svg"
          alt="bola futsal"
          className="w-full h-auto max-w-2xl object-contain opacity-50 bola-nyala relative z-10"
        />
      </div>

      {/* 🧭 Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 relative z-30">
        <div className="text-white text-2xl md:text-3xl font-bold">Kampoeng Futsal</div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-8 text-white">
          <a href="#" className="hover:text-purple-400 transition">Tentang</a>
          <a href="#" className="hover:text-purple-400 transition">Layanan</a>
          <a href="#" className="hover:text-purple-400 transition">Kontak</a>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 bg-opacity-95 px-6 py-4 flex flex-col gap-4 text-white relative z-30">
          <a href="#" className="hover:text-purple-400 transition">Tentang</a>
          <a href="#" className="hover:text-purple-400 transition">Layanan</a>
          <a href="#" className="hover:text-purple-400 transition">Kontak</a>
        </div>
      )}

      {/* 🏆 Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20 gap-8 relative z-30 max-w-7xl mx-auto">
        <div className="flex-1 text-white text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight">
            Kampoeng <br /> Futsal
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Rasakan pengalaman olahraga yang luar biasa dengan semangat dan passion kami.
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
           <button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
            >
              Mulai Sekarang
            </button>

            {/* <button className="border-2 border-purple-400 text-purple-400 px-10 py-4 rounded-full font-bold hover:bg-purple-400 hover:text-white hover:scale-105 transition-all">
              Pelajari Lebih Lanjut
            </button> */}
          </div>
        </div>
        
        {/* Spacer untuk desktop agar tidak terlalu dekat dengan gambar */}
        <div className="flex-1 hidden md:block"></div>
      </div>

      {/* 🌟 Bola Animation Effect */}
      <style>{`
        @keyframes bolaMelayang {
          0% { transform: translateY(0px) rotate(0deg); filter: brightness(1); }
          50% { transform: translateY(-10px) rotate(-3deg); filter: brightness(1.2); }
          100% { transform: translateY(0px) rotate(0deg); filter: brightness(1); }
        }

        @keyframes glow {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.2) rotate(180deg); 
            opacity: 0.6; 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(0.95); 
            opacity: 0.4; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.7; 
          }
        }

        @keyframes sparkle {
          0%, 100% { 
            transform: scale(0) rotate(0deg);
            opacity: 0; 
          }
          50% { 
            transform: scale(1) rotate(180deg);
            opacity: 1; 
          }
        }

        @keyframes ring-1 {
          0% { 
            transform: scale(0.9) rotate(0deg);
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            opacity: 0.6; 
          }
          100% { 
            transform: scale(0.9) rotate(360deg);
            opacity: 0.3; 
          }
        }

        @keyframes ring-2 {
          0% { 
            transform: scale(1.1) rotate(0deg);
            opacity: 0.2; 
          }
          50% { 
            transform: scale(0.9) rotate(-180deg);
            opacity: 0.5; 
          }
          100% { 
            transform: scale(1.1) rotate(-360deg);
            opacity: 0.2; 
          }
        }

        .sparkle {
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #fff, #fbbf24, transparent);
          border-radius: 50%;
          animation: sparkle 3s ease-in-out infinite;
          box-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b;
        }

        .animate-glow {
          animation: glow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-ring-1 {
          animation: ring-1 10s linear infinite;
        }

        .animate-ring-2 {
          animation: ring-2 12s linear infinite;
        }

        .bola-nyala {
          animation: bolaMelayang 5s ease-in-out infinite;
          filter:
            drop-shadow(0 0 40px rgba(255, 120, 0, 0.5))
            drop-shadow(0 0 80px rgba(255, 50, 0, 0.3))
            brightness(1.1);
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
}