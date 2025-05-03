<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        return Auth::user()->favorites()->get();
    }
    public function store(Request $request)
    {
        $request->validate(['comic_id' => 'required|exists:comics,id']);

        Auth::user()->favorites()->attach($request->comic_id);

        return response()->json(['message' => 'Comic añadido a favoritos.'], 201);
    }

    public function destroy(Comic $comic)
    {
        Auth::user()->favorites()->detach($comic->id);

        return response()->json(['message' => 'Comic eliminado de favoritos.']);
    }
}
