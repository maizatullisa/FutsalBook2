<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LapanganSummaryController extends Controller
{
public function today()
{
    $today = Carbon::today('Asia/Jakarta');

    $lapangan = Booking::select(
            'field_name',
            'location',
            DB::raw('COUNT(*) as total_booking')
        )
        ->whereDate('date', $today)
        ->whereNotIn('status', ['cancelled'])
        ->groupBy('field_name', 'location')
        ->get()
        ->map(function ($item) {
            $item->max_slot = 8;

            // status untuk frontend
            $item->status = $item->total_booking >= 8
                ? 'unavailable'
                : 'available';

            return $item;
        });

    return response()->json([
        'success' => true,
        'data' => $lapangan
    ]);
    }
}
