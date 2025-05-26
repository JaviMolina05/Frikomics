<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;

class CartController extends Controller
{
    /**
     * Muestra el carrito de un usuario específico.
     */
    public function show(User $user)
    {
        $cart = $user->cart()->with('items.comic')->first();

        if (!$cart) {
            return response()->json(['message' => 'Carrito no encontrado.'], 404);
        }

        return response()->json([
            'items' => $cart->items->map(function ($item) {
                return [
                    'comic_id' => $item->comic->id,
                    'title' => $item->comic->title,
                    'price' => $item->comic->price,
                    'quantity' => $item->quantity,
                    'total_price' => $item->quantity * $item->comic->price,
                ];
            }),
        ]);
    }

    /**
     * Vacía el carrito del usuario autenticado.
     */
    public function clear()
    {
        try {
            $user = auth()->user();
            $cart = $user->cart;

            if (!$cart) {
                return response()->json(['message' => 'No se encontró un carrito para este usuario.'], 404);
            }

            $items = $cart->items()->with('comic')->get();

            $deletedItems = $items->map(function ($item) {
                return [
                    'comic_id' => $item->comic->id,
                    'title' => $item->comic->title,
                    'price' => $item->comic->price,
                    'quantity' => $item->quantity,
                    'total_price' => $item->quantity * $item->comic->price,
                ];
            });

            $cart->items()->delete();

            return response()->json([
                'message' => 'Carrito vaciado correctamente.',
                'deleted_items' => $deletedItems,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al vaciar el carrito: ' . $e->getMessage(),
            ], 500);
        }
    }
}
