import React from 'react';
import { Settings, HelpCircle, BarChart3, PieChart, Activity, TrendingUp, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin"); 
  navigate("/login", { replace: true });
};

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/admin-dashboard' },
    { name: 'Lapangan', icon: Activity, path: '/admin/lapangan' },
    { name: 'Booking', icon: TrendingUp, path: '/admin/booking' },
    // { name: 'Analitik', icon: PieChart, path: '/admin/analitik' },
    { name: 'Pengguna', icon: Users, path: '/admin/pengguna' }
  ];

  return (
    <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
        <span className="text-xl font-bold text-white">ADMIN</span>
      </div>

      {/* Menu Items */}
      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="space-y-3 pt-6 border-t border-white/10">
      <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                  text-gray-400 hover:text-white hover:bg-white/5 transition-all"
      >
        <Settings size={20} />
        <span className="font-medium">Log out</span>
      </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <HelpCircle size={20} />
          <span className="font-medium">Bantuan</span>
        </button>
      </div>
    </div>
  );
}