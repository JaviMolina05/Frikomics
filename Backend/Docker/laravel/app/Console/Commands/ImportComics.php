<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Comic;

class ImportComics extends Command
{
    protected $signature = 'comics:import';
    protected $description = 'Importar cómics desde la API de ComicVine';

    public function handle()
    {
        $response = Http::withHeaders([
            'User-Agent' => 'LaravelApp/1.0'
        ])->get('https://comicvine.gamespot.com/api/issues/', [
            'api_key' => '78135e3dda6f59da28b241ef0af2a9e805573f3e',
            'format' => 'json'
        ]);
        

        $data = $response->json()['results'];

        foreach ($data as $comic) {
            Comic::updateOrCreate([
                'title' => $comic['name'],
            ], [
                'description' => $comic['deck'] ?? 'Sin descripción',
                'image' => $comic['image']['original_url'] ?? null,
                'price' => rand(5, 20),
                'stock' => rand(1, 10),
            ]);
        }

        $this->info('Cómics importados correctamente.');
        if ($response->failed()) {
            dd($response->status(), $response->body());
        }
        
    }
}

