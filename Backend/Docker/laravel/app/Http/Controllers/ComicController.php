<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;

class ComicController extends Controller
{
    public function index()
    {
        $comics = Comic::all();

        $comicInfoView = $comics->map(function ($comic) {
            return [
                'title' => $comic->title,
                'description' => $comic->description,
                'price' => $comic->price,
                'stock' => $comic->stock,
                'image' => $comic->image,
                'user_id' => $comic->user_id,
            ];
        });

        return response()->json(['comics' => $comicInfoView]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'required|string',
            'user_id' => 'required|integer'
        ]);

        Comic::create($validated);

        return response()->json([
            'message' => 'Comic creado exitosamente.'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $comic = Comic::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|integer',
            'stock' => 'sometimes|required|integer',
            'image' => 'sometimes|required|string',
            'user_id' => 'sometimes|required|integer'
        ]);

        $comic->update($validated);

        return response()->json([
            'message' => 'Comic actualizado exitosamente.'
        ], 200);
    }

    public function destroy($id)
    {
        $comic = Comic::findOrFail($id);
        $comic->delete();

        return response()->json([
            'message' => 'Comic eliminado exitosamente.'
        ], 200);
    }
}
