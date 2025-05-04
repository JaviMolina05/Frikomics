<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = auth()->user()->favorites()->get();

        return response()->json([
            'favorites' => $favorites
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate(['comic_id' => 'required|exists:comics,id']);

        Auth::user()->favorites()->attach($request->comic_id);

        return response()->json(['message' => 'Comic añadido a favoritos.'], 201);
    }

    public function destroy($comicId)
{
    $user = auth()->user();
    $comic = Comic::find($comicId);

    if (!$comic || !$user->favorites()->find($comicId)) {
        return response()->json([
            'error' => 'El cómic no se encuentra en tus favoritos.'
        ], 404);
    }

    $user->favorites()->detach($comicId);

    return response()->json([
        'message' => 'Cómic eliminado de favoritos.'
    ], 200);
}
}
