<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserBookingController extends Controller
{
    /**
     * Ambil semua booking dari seluruh user (ADMIN ONLY)
     */
    public function index(Request $request)
    {
        $token = $request->bearerToken();
        $admin = User::where('api_token', $token)->first();

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        if ($admin->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses dilarang, hny atmint'
            ], 403);
        }

        $bookings = Booking::with('user')->orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ], 200);
    }
}
