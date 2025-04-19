<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartItemController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|intenger',
            'comic_id' => 'required|intenger',
            'quantity' => 'required|intenger'
        ]);

        if ($validated->$request->fails()) {
            return response()->json([
                'error' => 'Error de validacion'
            ], 403);
        }

        $cartItem = CartItem::create([
            'cart_id' => $validated['cart_id'],
            'comic_id' => $validated['comic_id'],
            'quantity' => $validated['quantity']
        ]);

        return response()->json([
            'message' => 'Comic añadido al carrito exitosamente.',
            'cart_item' => $cartItem
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $cart = CartItem::findOrFail($id);

        $validated = $request->validate([
            'cart_id' => 'sometimes|required|integer',
            'comic_id' => 'sometimes|required|integer',
            'quantity' => 'sometimes|required|integer|min:1'
        ]);

        $cart->update($validated);

        return response()->json([
            'message' => 'Carrito actualizado exitosamente.',
            'cart_item' => $cart
        ], 200);
    }
    public function destroy($id)
    {
        $CartItem = CartItem::findOrFail($id);
        $CartItem->delete();

        return response()->json([
            'message' => 'Producto eliminado del carrito exitosamente.'
        ], 200);
    }


}
