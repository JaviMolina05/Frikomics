<?php
use App\Models\Comic;
use App\Models\User;
use Illuminate\Database\Seeder;

class ComicsTableSeeder extends Seeder
{
    public function run()
    {
        foreach (range(1, 10) as $i) {
            Comic::create([
                'title' => "Cómic Legendario #$i",
                'description' => "Una edición especial y rara del cómic número $i.",
                'price' => rand(20, 150),
                'image' => 'comic' . $i . '.jpg',
                'status' => 'available',
                'user_id' => User::inRandomOrder()->first()->id,
            ]);
        }
    }
}
