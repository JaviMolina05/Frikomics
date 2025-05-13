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
        $public = trim(config('services.marvel.public'));
        $private = trim(config('services.marvel.private'));
        $ts = time();
        $hash = md5($ts . $private . $public);

        $this->info('Clave pública: ' . $public);

        $response = Http::get('https://gateway.marvel.com/v1/public/comics', [
            'apikey' => $public,
            'ts' => $ts,
            'hash' => $hash,
            'limit' => 10,
        ]);

        if ($response->successful()) {
            $json = $response->json();

            if (isset($json['data']['results'])) {
                $comics = $json['data']['results'];

                foreach ($comics as $comic) {
                    Comic::updateOrCreate(
                        ['title' => $comic['title']],
                        [
                            'description' => $comic['description'] ?? 'Sin descripción',
                            'price' => rand(5, 25),
                            'stock' => rand(1, 10),
                            'image' => $comic['thumbnail']['path'] . '.' . $comic['thumbnail']['extension'],
                            'editorial' => 'Marvel',
                            'genero' => 'Superhéroes',
                            'status' => 'available',
                            'user_id' => 1,
                        ]
                    );
                }

                $this->info('Cómics importados exitosamente.');
            } else {
                $this->error('La respuesta no contiene resultados.');
                dd($json); // Para inspeccionar el error
            }
        } else {
            $this->error('Error al llamar la API de Marvel.');
            dd($response->json()); // Muestra el error exacto
        }

    }
}
