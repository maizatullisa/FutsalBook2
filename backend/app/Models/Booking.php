<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Booking extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'api_token',
        'field_name',
        'location',
        'date',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'name',
        'phone',
        'email',
        'notes',
    ];

     public function user()
    {
        return $this->belongsTo(User::class);
    }

     protected $appends = ['computed_status'];

        public function getComputedStatusAttribute()
        {
            $now = Carbon::now('Asia/Jakarta');

            $start = Carbon::parse($this->date.' '.$this->start_time, 'Asia/Jakarta');
            $end   = Carbon::parse($this->date.' '.$this->end_time, 'Asia/Jakarta');

            if ($now->lt($start)) {
                return 'akan datang';
            }

            if ($now->between($start, $end)) {
                return 'sedang berlangsung';
            }

            return 'selesai';
        }

}