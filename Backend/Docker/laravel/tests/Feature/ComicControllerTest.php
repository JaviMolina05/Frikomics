<?php

namespace Tests\Feature;

use App\Models\Comic;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ComicControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @dataProvider crearComicProvider
     */
    public function testCrearComic($datos, $esperaStatus, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->json('POST', '/api/comics', $datos, [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($esperaStatus);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function crearComicProvider()
    {
        return [
            'datos válidos' => [[
                'title' => 'Comic Test',
                'description' => 'Descripción',
                'price' => 100,
                'stock' => 5,
                'image' => 'http://example.com/image.jpg',
                'user_id' => 1
            ], 201, ['message']],
            'datos inválidos' => [[
                'title' => '',
                'description' => '',
                'price' => 'no-numero',
                'stock' => null,
                'image' => '',
                'user_id' => null
            ], 422, ['message', 'errors']],
        ];
    }

    public function testVerTodosLosComics()
    {
        Comic::factory()->count(3)->create();

        $response = $this->getJson('/api/comics');

        $response->assertStatus(200);
        $response->assertJsonStructure(['comics']);
    }

    /**
     * @dataProvider actualizarComicProvider
     */
    public function testActualizarComic($datos, $esperaStatus, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = Comic::factory()->create(['user_id' => $user->id]);

        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->json('PUT', "/api/comics/{$comic->id}", $datos, [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($esperaStatus);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function actualizarComicProvider()
    {
        return [
            'actualización válida' => [[
                'title' => 'Nuevo Título',
                'price' => 200
            ], 200, ['message']],
            'actualización inválida' => [[
                'price' => 'no-es-numero'
            ], 422, ['message', 'errors']],
        ];
    }

    /**
     * @dataProvider eliminarComicProvider
     */
    public function testEliminarComic($existe, $esperaStatus, $estructuraEsperada)
    {
        $user = User::factory()->create();
        $comic = $existe ? Comic::factory()->create(['user_id' => $user->id]) : null;

        $comicId = $existe ? $comic->id : 9999;
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->json('DELETE', "/api/comics/{$comicId}", [], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus($esperaStatus);
        $response->assertJsonStructure($estructuraEsperada);
    }

    public function eliminarComicProvider()
    {
        return [
            'comic existente' => [true, 200, ['message']],
            'comic no encontrado' => [false, 404, ['message']],
        ];
    }
}
