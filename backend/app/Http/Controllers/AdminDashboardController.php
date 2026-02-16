<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Booking;
use App\Models\Lapangan;
use App\Models\User;
class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        $bookingHariIni = Booking::whereDate('created_at', $today)->count();
        $totalPemasukan = Booking::whereDate('created_at', $today)->sum('total_bayar');
        $lapanganAktif = Lapangan::where('status', 'aktif')->count();

        return response()->json([
            'booking_hari_ini' => $bookingHariIni,
            'total_pemasukan' => $totalPemasukan,
            'lapangan_aktif' => $lapanganAktif,
        ]);
    }

        public function user()
    {
        $users = User::all(); 

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

}
