import React, { useState, useEffect } from 'react';
import { Eye, X, Loader2 } from 'lucide-react';
import SidebarAdmin from '../../components/SidebarAdmin';

export default function AdminPengguna() {
 const [pengguna, setPengguna] = useState([]);
  // const [mockBookings, setMockBookings] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari backend
  useEffect(() => {
    fetchPengguna();
  }, []);

const fetchPengguna = async () => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:8000/api/admin/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    const result = await res.json();
    console.log("API USERS:", result);

    if (res.ok && result.success) {
      setPengguna(result.data);
    } else {
      setPengguna([]);
    }

  } catch (err) {
    console.error(err);
    setPengguna([]);
  } finally {
    setLoading(false);
  }
};


      // Fetch booking untuk setiap user
    //   await fetchBookings(data);
    // } catch (err) {
    //   setError(err.message);
    //   console.error('Error:', err);
    // } finally {
    //   setLoading(false);
    // }
  

  // const fetchBookings = async (users) => {
  //   try {
  //     const bookingsData = {};

  //     // Fetch booking untuk setiap user
  //     for (const user of users) {
  //       const response = await fetch(`http://localhost:3000/api/admin/bookings/${user.id}`);
        
  //       if (response.ok) {
  //         const data = await response.json();
  //         bookingsData[user.id] = data;
  //       } else {
  //         bookingsData[user.id] = [];
  //       }
  //     }

  //     setMockBookings(bookingsData);
  //   } catch (err) {
  //     console.error('Error fetching bookings:', err);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (window.confirm('Yakin ingin menghapus pengguna ini?')) {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token")
  //         }
  //       });

  //       if (response.ok) {
  //         setPengguna(pengguna.filter(p => p.id !== id));
  //         alert('Pengguna berhasil dihapus');
  //       } else {
  //         alert('Gagal menghapus pengguna');
  //       }
  //     } catch (err) {
  //       console.error('Error deleting:', err);
  //       alert('Terjadi kesalahan');
  //     }
  //   }
  // };

  const filteredPengguna = pengguna.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // if (loading) {
  //   return (
  //     <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
  //       <SidebarAdmin />
  //       <div className="flex-1 flex items-center justify-center">
  //         <div className="text-center">
  //          <Loader2 size={40} className="text-white animate-spin mx-auto mb-4" />
  //           <p className="text-white">Memuat data...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Pengguna</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 w-64"
            />
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Daftar Pengguna</h2>
            <p className="text-gray-400 text-sm">Total: {pengguna.length} pengguna</p>
          </div>

          {/* Table */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl overflow-hidden">
            {filteredPengguna.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/15">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Nama</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">No. Telepon</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Bergabung</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPengguna.map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-semibold">{user.name}</td>
                        <td className="px-6 py-4 text-gray-300">{user.email}</td>
                        <td className="px-6 py-4 text-gray-300">{user.phone || '-'}</td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                            >
                              <Eye size={16} />
                            </button>
                            {/* <button
                              onClick={() => handleDelete(user.id)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                            >
                              <Trash2 size={16} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">Tidak ada pengguna</div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-2">Total Pengguna</p>
              <p className="text-3xl font-bold text-white">{pengguna.length}</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-2">Aktif</p>
              <p className="text-3xl font-bold text-green-400">{pengguna.length}</p>
            </div>
            {/* <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-2">Total Booking</p>
              <p className="text-3xl font-bold text-blue-400">
                {Object.values(mockBookings).reduce((sum, arr) => sum + arr.length, 0)}
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal Detail Pengguna */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl w-full max-w-md max-h-96 overflow-y-auto">
            {/* Header Modal */}
            <div className="sticky top-0 flex justify-between items-center px-6 py-4 border-b border-white/15 bg-gradient-to-br from-slate-900 to-purple-900">
              <h2 className="text-xl font-bold text-white">Detail Pengguna</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Info Pengguna */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Informasi Akun</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-gray-400 text-sm">Nama</p>
                    <p className="text-white font-semibold">{selectedUser.name}</p>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">{selectedUser.email}</p>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-gray-400 text-sm">No. Telepon</p>
                    <p className="text-white font-semibold">{selectedUser.phone}</p>
                  </div>
                  {/* <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-gray-400 text-sm">Alamat</p>
                    <p className="text-white font-semibold">{selectedUser.alamat}</p>
                  </div> */}
                </div>
              </div>

              {/* Riwayat Booking */}
              {/* <div className="border-t border-white/15 pt-4">
                <h3 className="text-lg font-bold text-white mb-3">
                  Riwayat Booking ({mockBookings[selectedUser.id]?.length || 0})
                </h3>
                {mockBookings[selectedUser.id] && mockBookings[selectedUser.id].length > 0 ? (
                  <div className="space-y-2">
                    {mockBookings[selectedUser.id].map((booking) => (
                      <div key={booking.id} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white text-sm font-semibold">{booking.lapangan_name}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                          <Calendar size={12} />
                          {new Date(booking.tanggal_booking).toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock size={12} />
                          {booking.jam_mulai} - {booking.jam_selesai}
                        </p>
                        <p className={`text-xs mt-1 font-semibold ${
                          booking.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {booking.status === 'confirmed' ? '✓ Confirmed' : '⏱ Pending'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Belum ada booking</p>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}