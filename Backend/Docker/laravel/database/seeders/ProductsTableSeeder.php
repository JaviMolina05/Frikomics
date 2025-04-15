<?php
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        foreach (range(1, 10) as $i) {
            Product::create([
                'title' => "Cómic #$i",
                'description' => "Descripción del cómic $i",
                'price' => rand(10, 100),
                'status' => 'available',
                'user_id' => User::inRandomOrder()->first()->id,
            ]);
        }
    }
}
