<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Comic;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FavoriteControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @dataProvider agregarFavoritoProvider
     */
    public function testAgregarComicAFavoritos($comicValido, $statusEsperado, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $comicValido ? Comic::factory()->create() : ['id' => 9999];

        $token = $user->createToken('TestToken')->plainTextToken;
        $response = $this->json('POST', '/api/favorites', [
            'comic_id' => $comicValido ? $comic->id : $comic['id']
        ], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function agregarFavoritoProvider()
    {
        return [
            'correcto' => [true, 200, ['message']],
            'erroneo' => [false, 404, ['error']]
        ];
    }

    /**
     * @dataProvider verFavoritosProvider
     */
    public function testVerFavoritos($esperaFavoritos)
    {
        $user = User::factory()->create();
        if ($esperaFavoritos) {
            $comic = Comic::factory()->create();
            $user->favorites()->attach($comic->id);
        }

        $token = $user->createToken('TestToken')->plainTextToken;
        $response = $this->json('GET', '/api/favorites', [], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['favorites']);
    }

    public function verFavoritosProvider()
    {
        return [
            'con favoritos' => [true],
            'sin favoritos' => [false]
        ];
    }

    /**
     * @dataProvider eliminarFavoritoProvider
     */
    public function testEliminarComicDeFavoritos($comicValido, $statusEsperado, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $comicValido ? Comic::factory()->create() : ['id' => 9999];

        if ($comicValido) {
            $user->favorites()->attach($comic->id);
        }

        $token = $user->createToken('TestToken')->plainTextToken;
        $response = $this->json('DELETE', '/api/favorites/' . ($comicValido ? $comic->id : $comic['id']), [], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function eliminarFavoritoProvider()
    {
        return [
            'correcto' => [true, 200, ['message']],
            'erroneo' => [false, 404, ['error']]
        ];
    }
}
