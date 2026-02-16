import React, { useState, useEffect } from 'react';
import { Search, MapPin, Edit2, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import SidebarAdmin from '../../components/SidebarAdmin';

export default function AdminLapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    field_name: '',
    location: '',
    harga: '',
    status: 'available'
  });

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/lapangan/today", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLapangan(data.data);
        console.log("LAPANGAN:", data.data);
      }
    } catch (err) {
      console.error("Gagal ambil lapangan", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm('Yakin ingin menghapus lapangan ini?')) {
  //     try {
  //       const res = await fetch(`http://localhost:8000/api/admin/lapangan/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token")
  //         }
  //       });

  //       if (res.ok) {
  //         alert('Lapangan berhasil dihapus');
  //         fetchLapangan();
  //       }
  //     } catch (err) {
  //       console.error("Gagal hapus lapangan", err);
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const url = editingId 
  //       ? `http://localhost:8000/api/admin/lapangan/${editingId}`
  //       : "http://localhost:8000/api/lapangan";
      
  //     const method = editingId ? 'PUT' : 'POST';

  //     const res = await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       alert(editingId ? 'Lapangan berhasil diupdate' : 'Lapangan berhasil ditambah');
  //       setShowModal(false);
  //       setEditingId(null);
  //       setFormData({ field_name: '', location: '', harga: '', status: 'available' });
  //       fetchLapangan();
  //     }
  //   } catch (err) {
  //     console.error("Gagal simpan lapangan", err);
  //   }
  // };

  // const handleEdit = (item) => {
  //   setEditingId(item.id);
  //   setFormData({
  //     field_name: item.field_name,
  //     location: item.location,
  //     harga: item.harga || '',
  //     status: item.status || 'available'
  //   });
  //   setShowModal(true);
  // };

  const filteredLapangan = lapangan.filter(item =>
    item.field_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Lapangan</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Cari lapangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 w-64"
            />
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Header dengan Button Tambah */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Daftar Booking Lapangan</h2>
              <p className="text-gray-400 text-sm">Booking Lapangan Harian</p>
            </div>
            {/* <button
              onClick={() => {
                setEditingId(null);
                setFormData({ field_name: '', location: '',  status: 'available' });
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
            >
              <Plus size={20} />
              Tambah Lapangan
            </button> */}
          </div>

          {/* Table */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading...
              </div>
            ) : filteredLapangan.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/15">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Nama Lapangan</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Lokasi</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Harga</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLapangan.map((item, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-6 py-4">
                          <p className="text-white font-semibold">{item.field_name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin size={16} className="text-cyan-400" />
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white font-semibold">
                            {item.harga ? `Rp ${parseInt(item.harga).toLocaleString('id-ID')}` : '-'}
                          </p>
                        </td>
                         <td className="px-6 py-4">
  {/* MAINTENANCE */}
  {item.status === 'maintenance' && (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
      bg-yellow-500/20 text-yellow-400">
      ⚙ Perbaikan
    </span>
  )}

  {/* UNAVAILABLE */}
  {item.status === 'unavailable' && (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
      bg-gray-500/20 text-gray-400">
      ✕ Tidak Tersedia
    </span>
  )}

  {/* AVAILABLE & MASIH ADA SLOT */}
  {item.status === 'available' && item.total_booking < item.max_slot && (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
      bg-green-500/20 text-green-400">
      ✓ Tersedia ({item.total_booking}/{item.max_slot})
    </span>
  )}

  {/* AVAILABLE TAPI PENUH */}
  {item.status === 'available' && item.total_booking >= item.max_slot && (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
      bg-red-500/20 text-red-400">
      ✕ Penuh ({item.max_slot}/{item.max_slot})
    </span>
  )}
</td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {/* <button
                              onClick={() => handleEdit(item)}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button> */}
                            {/* <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                              title="Hapus"
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
              <div className="p-8 text-center text-gray-400">
                Tidak ada lapangan ditemukan
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-2">Total Lapangan</p>
              <p className="text-3xl font-bold text-white">{lapangan.length}</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-2">Tersedia</p>
              <p className="text-3xl font-bold text-green-400">
  {lapangan.filter(
    l => l.status === 'available' && l.total_booking < l.max_slot
  ).length}
</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Lapangan' : 'Tambah Lapangan Baru'}
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Nama Lapangan</label>
                <input
                  type="text"
                  value={formData.field_name}
                  onChange={(e) => setFormData({...formData, field_name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                  placeholder="Contoh: Lapangan A"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Lokasi</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                  placeholder="Contoh: Indoor Premium"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Harga per Jam</label>
                <input
                  type="number"
                  value={formData.harga}
                  onChange={(e) => setFormData({...formData, harga: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                  placeholder="Contoh: 150000"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="available">Tersedia</option>
                  <option value="maintenance">Perbaikan</option>
                  <option value="unavailable">Tidak Tersedia</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
                >
                  {editingId ? 'Update' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}