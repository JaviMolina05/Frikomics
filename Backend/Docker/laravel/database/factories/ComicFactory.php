<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ComicFactory extends Factory
{
    protected $model = \App\Models\Comic::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 5, 100),
            'stock' => $this->faker->numberBetween(1, 50),
            'image' => $this->faker->imageUrl,
            'editorial' => $this->faker->company,
            'genero' => 'Acción',
            'user_id' => \App\Models\User::factory(),
        ];
    }
}
