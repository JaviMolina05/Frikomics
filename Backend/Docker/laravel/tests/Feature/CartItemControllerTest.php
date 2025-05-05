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

        $comicId = $comicValido ? $comic->id : 9999;

        $token = $user->createToken('TestToken')->plainTextToken;

        $datos = [
            'cart_id' => 1,  // Suponiendo que el carrito tiene id 1
            'comic_id' => $comicId,
            'quantity' => 2
        ];

        $response = $this->json('POST', '/api/cart-items', $datos, [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function agregarAlCarritoProvider()
    {
        return [
            'correcto' => [true, 201, ['message', 'cart_item' => ['id', 'cart_id', 'comic_id', 'quantity', 'created_at', 'updated_at']]],
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
            'cart_id' => 1,
            'comic_id' => $comic ? $comic->id : 9999,
            'quantity' => 2
        ]);
        $token = $user->createToken('TestToken')->plainTextToken;

        $datos = [
            'quantity' => 5
        ];

        $response = $this->json('PUT', '/api/cart-items/' . $cartItem->id, $datos, [
            'Authorization' => 'Bearer ' . $token
        ]);

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
            'cart_id' => 1,
            'comic_id' => $comic->id,
            'quantity' => 2
        ]) : null;
        $token = $user->createToken('TestToken')->plainTextToken;

        $comicId = $comicValido ? $comic->id : 9999;

        $response = $this->json('DELETE', '/api/cart-items/' . $cartItem->id, [], [
            'Authorization' => 'Bearer ' . $token
        ]);

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
