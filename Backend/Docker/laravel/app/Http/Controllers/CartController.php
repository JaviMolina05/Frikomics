<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\User;

class CartController extends Controller
{
    public function show(User $user)
{
    $items = $user->cartItems()->with('product')->get();
    
    return response()->json([
        'user_id' => $user->id,
        'items' => $items->map(function ($item) {
            return [
                'product_id' => $item->product_id,
                'title' => $item->product->title,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
                'total_price' => $item->quantity * $item->product->price,
            ];
        }),
    ]);
}

public function clear()
{
    $user = auth()->user();
    $deletedItems = $user->cartItems()->delete();

    return response()->json([
        'message' => 'Carrito vaciado correctamente',
        'deleted_items' => $deletedItems,
    ]);
}


}
