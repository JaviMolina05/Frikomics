<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Cart;

class CartItemController extends Controller
{
    public function store(Request $request)
{
    try {
        \Log::info('Añadiendo al carrito', ['user' => auth()->id(), 'request' => $request->all()]);

        $validated = $request->validate([
            'product_id' => 'required|integer|exists:comics,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $user = auth()->user();

        // Buscar o crear el carrito del usuario
        $cart = Cart::firstOrCreate([
            'user_id' => $user->id,
        ]);

        // Buscar si ya existe el item en el carrito
        $existingItem = $cart->items()
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingItem) {
            // Si ya existe, aumentar la cantidad
            $existingItem->quantity += $validated['quantity'];
            $existingItem->save();

            $cartItem = $existingItem;
        } else {
            // Si no existe, crearlo
            $cartItem = $cart->items()->create([
                'product_id' => $validated['product_id'],
                'quantity'   => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message'   => 'Producto añadido al carrito exitosamente.',
            'cart_item' => $cartItem
        ], 201);

    } catch (\Exception $e) {
        \Log::error('Error al añadir al carrito', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'No se pudo añadir el producto.'], 500);
    }
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

    public function destroy($productId)
{
    $user = auth()->user();

    // Obtener el carrito del usuario autenticado
    $cart = $user->cart;

    if (!$cart) {
        return response()->json(['error' => 'No se encontró el carrito.'], 404);
    }

    // Buscar el ítem en el carrito por product_id
    $cartItem = $cart->items()->where('product_id', $productId)->first();

    if (!$cartItem) {
        return response()->json(['error' => 'No se encontró el producto en el carrito.'], 404);
    }

    $cartItem->delete();

    return response()->json([
        'message' => 'Producto eliminado del carrito exitosamente.'
    ], 200);
}

}
