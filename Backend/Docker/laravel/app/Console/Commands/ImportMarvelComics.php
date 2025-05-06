<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Comic;

class ImportMarvelComics extends Command
{
    protected $signature = 'import:marvel-comics';
    protected $description = 'Importar cómics desde la API de Marvel Developer';

    public function handle()
    {
        $public = config('services.marvel.public');
        $private = config('services.marvel.private');
        $ts = time();
        $hash = md5($ts . $private . $public);

        $response = Http::get('https://gateway.marvel.com/v1/public/comics', [
            'apikey' => $public,
            'ts' => $ts,
            'hash' => $hash,
            'limit' => 10,
        ]);

        $comics = $response->json()['data']['results'];

        foreach ($comics as $comic) {
            Comic::updateOrCreate(
                ['title' => $comic['title']],
                [
                    'description' => $comic['description'] ?? 'Sin descripción',
                    'price' => rand(5, 25), // Marvel no da precios, puedes generar uno aleatorio
                    'stock' => rand(1, 10),
                    'image' => $comic['thumbnail']['path'] . '.' . $comic['thumbnail']['extension'],
                    'editorial' => 'Marvel',
                    'genero' => 'Superhéroes', // valor predeterminado
                    'status' => 'available',
                    'user_id' => 1, // admin
                ]
            );
        }

        $this->info('Comics importados exitosamente.');
    }
}
