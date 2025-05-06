<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartItemController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:comics,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::create([
            'user_id'    => auth()->id(),
            'product_id' => $validated['product_id'],
            'quantity'   => $validated['quantity'],
        ]);

        return response()->json([
            'message'    => 'Producto añadido al carrito exitosamente.',
            'cart_item'  => $cartItem
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'sometimes|required|integer|exists:comics,id',
            'quantity'   => 'sometimes|required|integer|min:1',
        ]);

        $cartItem->update($validated);

        return response()->json([
            'message'    => 'Producto del carrito actualizado exitosamente.',
            'cart_item'  => $cartItem
        ], 200);
    }

    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json([
            'message' => 'Producto eliminado del carrito exitosamente.'
        ], 200);
    }
}
