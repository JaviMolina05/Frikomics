<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Comic;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testVerCarritoConItems()
    {
        $user = User::factory()->create();
        $comic = Comic::factory()->create(['price' => 10.00]);

        CartItem::create([
            'user_id' => $user->id,
            'product_id' => $comic->id,
            'quantity' => 2,
        ]);

        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}"
        ])->getJson("/api/cart/{$user->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user_id',
            'items' => [
                [
                    'product_id',
                    'title',
                    'price',
                    'quantity',
                    'total_price'
                ]
            ]
        ]);
        dump($response->json());
    }

    public function testVerCarritoVacio()
    {
        $user = User::factory()->create();

        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}"
        ])->getJson("/api/cart/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'user_id' => $user->id,
            'items' => [],
        ]);
    }

    public function testVaciarCarrito()
    {
        $user = User::factory()->create();
        $comic = Comic::factory()->create();

        CartItem::create([
            'user_id' => $user->id,
            'product_id' => $comic->id,
            'quantity' => 1,
        ]);

        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}"
        ])->deleteJson('/api/cart/clear');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'deleted_items'
        ]);

        $this->assertDatabaseMissing('cart_items', [
            'user_id' => $user->id,
            'product_id' => $comic->id,
        ]);
    }
}
