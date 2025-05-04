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
        // Crear un cómic válido si es necesario
        $comic = $comicValido ? Comic::factory()->create() : null;

        // Si el cómic no es válido, se simula un cómic no existente
        $comicId = $comicValido ? $comic->id : 9999;

        $token = $user->createToken('TestToken')->plainTextToken;
        $response = $this->json('POST', '/api/favorites', [
            'comic_id' => $comicId
        ], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($statusEsperado);
        $response->assertJsonStructure($estructuraEsperada);
    }

   public function agregarFavoritoProvider()
{
    return [
        'correcto' => [true, 201, ['message']],  // Cambié 200 por 201
        'erroneo' => [false, 422, ['message', 'errors']],
    ];
}

    /**
     * @dataProvider verFavoritosProvider
     */
    public function testVerFavoritos($esperaFavoritos)
    {
        $user = User::factory()->create();
        if ($esperaFavoritos) {
            // Crear un cómic y agregarlo a favoritos
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
        $comic = $comicValido ? Comic::factory()->create() : null;

        // Si el cómic es válido, lo agregamos a favoritos
        $comicId = $comicValido ? $comic->id : 9999;
        if ($comicValido) {
            $user->favorites()->attach($comic->id);
        }

        $token = $user->createToken('TestToken')->plainTextToken;
        $response = $this->json('DELETE', '/api/favorites/' . $comicId, [], [
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
