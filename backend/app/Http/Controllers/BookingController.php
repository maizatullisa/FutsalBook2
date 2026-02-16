<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;


class BookingController extends Controller
{
    /**
     * Menampilkan daftar booking milik user yang sedang login (berdasarkan api_token)
     */
        public function index(Request $request)
    {
        $token = $request->bearerToken();
        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        $bookings = Booking::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }


    /**
     * Simpan data booking baru dengan user_id
     */
    public function store(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'field_name' => 'required|string',
            'location' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'total_price' => 'required|integer',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
        ]);

        $validated['user_id'] = $user->id; // Tambahkan user_id ke data

        // cek bentrok jadwal
        $conflict = Booking::where('field_name', $validated['field_name'])
            ->where('date', $validated['date'])
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($validated) {
                $q->where('start_time', '<', $validated['end_time'])
                ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'Jam ini sudah dibooking'
            ], 409);
        }


        $booking = Booking::create($validated);

        return response()->json([
            'success' => true,
            'data' => $booking
        ], 201);
    }

    /**
     * Update status booking
     */
    public function update(Request $request, $id) {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'in:upcoming,ongoing,completed,cancelled',
        ]);

        $booking->update($validated);

        return response()->json($booking, 200);
    }

        public function bookingsToday()
    {
        $today = now()->timezone('Asia/Jakarta')->toDateString();

        $bookings = Booking::whereDate('date', $today)->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }


}
