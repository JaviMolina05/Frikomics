<?php

namespace Database\Factories;

use App\Models\CartItem;
use App\Models\User;
use App\Models\Comic;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    protected $model = CartItem::class;

    public function definition()
    {
        return [
            'quantity' => $this->faker->numberBetween(1, 5),
            'user_id' => User::factory(),
            'product_id' => Comic::factory(),
        ];
    }
}
