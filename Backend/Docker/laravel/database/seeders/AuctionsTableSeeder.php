<?php
use App\Models\Auction;
use App\Models\Comic;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AuctionsTableSeeder extends Seeder
{
    public function run()
    {
        foreach (Comic::take(5)->get() as $comic) {
            Auction::create([
                'product_id' => $comic->id,
                'start_time' => Carbon::now(),
                'end_time' => Carbon::now()->addDays(3),
                'starting_price' => $comic->price,
                'active' => true,
            ]);

            $comic->update(['status' => 'in_auction']);
        }
    }
}

