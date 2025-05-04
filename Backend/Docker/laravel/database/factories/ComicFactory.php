<?php

namespace Database\Factories;

use App\Models\Comic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ComicFactory extends Factory
{
    protected $model = Comic::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'image' => $this->faker->imageUrl(640, 480, 'comics', true),
            'editorial' => $this->faker->randomElement(['Marvel', 'DC', 'Image Comics', 'Dark Horse']),
            'genero' => $this->faker->randomElement(['Acción', 'Aventura', 'Fantasía', 'Ciencia ficción']),
        ];
    }
}
