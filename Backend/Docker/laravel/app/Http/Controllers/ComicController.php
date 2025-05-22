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
                'id' => $comic->id,
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

    public function show($id)
{
    $comic = Comic::find($id);

    if (!$comic) {
        return response()->json(['error' => 'Comic not found'], 404);
    }

    $comicInfo = [
        'id' => $comic->id,
        'title' => $comic->title,
        'description' => $comic->description,
        'price' => $comic->price,
        'stock' => $comic->stock,
        'image' => $comic->image,
        'editorial' => $comic->editorial,
        'tipo' => $comic->tipo,
        'genero' => $comic->genero,
        'user_id' => $comic->user_id,
    ];

    return response()->json(['comic' => $comicInfo]);
}


    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'editorial' => 'required|string',
        'genero' => 'required|string',
        'status' => 'required|string',
        'tipo' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
    ]);

    // Guardar imagen
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('comics', 'public');
        $validated['image'] = $imagePath;
    }

    $validated['user_id'] = auth()->id();

    Comic::create($validated);

    return response()->json([
        'message' => 'Comic creado exitosamente.'
    ], 201);
}


    public function update(Request $request, $id)
    {
        $comic = Comic::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|string',
            'editorial' => 'required|string',
            'genero' => 'required|string',
            'status' => 'in:available,sold,in_auction',
            'user_id' => 'required|integer',
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
