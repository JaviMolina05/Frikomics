<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Auction;
use Illuminate\Support\Facades\Log;

class CloseExpiredAuctions extends Command
{
    protected $signature = 'auctions:close-expired';
    protected $description = 'Cierra subastas expiradas y asigna el ganador';

    public function handle()
    {
        $expiredAuctions = Auction::where('end_time', '<=', now())
            ->whereNull('winner_id')
            ->get();

        foreach ($expiredAuctions as $auction) {
            Log::info("Revisando subasta: {$auction->id}");
            $highestBid = $auction->bids()->orderByDesc('amount')->first();

            if ($highestBid) {
                $auction->winner_id = $highestBid->user_id;
                $auction->notified = true;
                $auction->seen = false;
                $auction->save();
            }
        }

        $this->info('Subastas expiradas procesadas correctamente.');
    }
}


