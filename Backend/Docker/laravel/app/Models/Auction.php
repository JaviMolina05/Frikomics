<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'condition',
        'seller_note',
        'start_time',
        'end_time',
        'starting_price',
        'current_price',
        'active',
        'image',
        'winner_id',
    ];

    // Relaciones
    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    // Scopes útiles
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeEnded($query)
    {
        return $query->where('end_time', '<', now());
    }

    public function scopeOngoing($query)
    {
        return $query->where('start_time', '<=', now())->where('end_time', '>', now());
    }
}
