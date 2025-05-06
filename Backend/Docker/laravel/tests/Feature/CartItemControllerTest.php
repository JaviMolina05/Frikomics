<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Comic;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartItemControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @dataProvider agregarAlCarritoProvider
     */
    public function testAgregarComicAlCarrito($comicValido, $statusEsperado, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $comicValido ? Comic::factory()->create() : null;

        $productId = $comicValido ? $comic->id : 9999;

        $token = $user->createToken('TestToken')->plainTextToken;

        $datos = [
            'product_id' => $productId,
            'quantity' => 2
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->json('POST', '/api/cart-items', $datos);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function agregarAlCarritoProvider()
    {
        return [
            'correcto' => [true, 201, ['message', 'cart_item' => ['id', 'user_id', 'product_id', 'quantity', 'created_at', 'updated_at']]],
            'erroneo' => [false, 422, ['message', 'errors']],
        ];
    }

    /**
     * @dataProvider actualizarCarritoProvider
     */
    public function testActualizarComicEnCarrito($comicValido, $statusEsperado, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $comicValido ? Comic::factory()->create() : null;

        $cartItem = CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $comic ? $comic->id : 9999,
            'quantity' => 2
        ]);

        $token = $user->createToken('TestToken')->plainTextToken;

        $datos = [
            'quantity' => 5
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->json('PUT', '/api/cart-items/' . $cartItem->id, $datos);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function actualizarCarritoProvider()
    {
        return [
            'correcto' => [true, 200, ['message', 'cart_item' => ['id', 'quantity']]],
            'erroneo' => [false, 404, ['error']],
        ];
    }

    /**
     * @dataProvider eliminarDelCarritoProvider
     */
    public function testEliminarComicDelCarrito($comicValido, $statusEsperado, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $comicValido ? Comic::factory()->create() : null;

        $cartItem = $comicValido ? CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $comic->id,
            'quantity' => 2
        ]) : null;

        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->json('DELETE', '/api/cart-items/' . ($cartItem->id ?? 9999), []);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function eliminarDelCarritoProvider()
    {
        return [
            'correcto' => [true, 200, ['message']],
            'erroneo' => [false, 404, ['error']],
        ];
    }
}
