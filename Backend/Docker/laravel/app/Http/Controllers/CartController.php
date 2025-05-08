<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\User;

class CartController extends Controller
{
    public function show(User $user)
{
    $items = $user->cartItems()->with('comic')->get();
    
    return response()->json([
        'user_id' => $user->id,
        'items' => $items->map(function ($item) {
            return [
                'comic_id' => $item->comic->id ?? $item->product_id, 
                'title' => $item->comic->title,
                'price' => $item->comic->price,
                'quantity' => $item->quantity,
                'total_price' => $item->quantity * $item->comic->price,
            ];
        }),
    ]);
}


public function clear()
{
    try {
        $user = auth()->user();
        $items = $user->cartItems()->with('comic')->get();

        $deletedItems = $items->map(function ($item) {
            return [
                'comic_id' => $item->product_id,
                'title' => $item->comic->title,
                'price' => $item->comic->price,
                'quantity' => $item->quantity,
                'total_price' => $item->quantity * $item->comic->price,
            ];
        });

        $user->cartItems()->delete();

        return response()->json([
            'message' => 'Carrito vaciado correctamente',
            'deleted_items' => $deletedItems,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
        ], 500);
    }
}




}
