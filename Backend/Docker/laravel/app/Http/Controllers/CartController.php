<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartController extends Controller
{
    public function show($userId)
    {
        $items = CartItem::with('comic') 
            ->where('user_id', $userId)
            ->get();

        $cart = [];

        foreach ($items as $item) {
            $cart[] = [
                'comic_id' => $item->comic->id,
                'title' => $item->comic->title,
                'price' => $item->comic->price,
                'quantity' => $item->quantity,
                'total_price' => $item->quantity * $item->comic->price,
            ];
        }

        return response()->json([
            'user_id' => $userId,
            'items' => $cart,
        ]);
    }
    public function clear()
{
    $userId = auth()->id();
    $deleted = CartItem::where('user_id', $userId)->delete();

    return response()->json([
        'message' => 'Tu carrito ha sido vaciado.',
        'deleted_items' => $deleted
    ]);
}

}
