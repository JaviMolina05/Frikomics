<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;
    protected $fillable = ['comic_id', 'start_time', 'end_time', 'starting_price', 'active'];

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }
}
