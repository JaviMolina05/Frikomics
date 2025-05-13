<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show()
    {
        return response()->json([
            'user' => Auth::user()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed', //Añadir min6 mas tarde
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'normal';

        $user = \App\Models\User::create($validated);

        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'user' => $user
        ], 201);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Perfil actualizado correctamente.',
            'user' => $user
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();
        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }
}
