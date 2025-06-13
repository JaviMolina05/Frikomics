<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Guarda un nuevo pedido a partir del carrito del usuario autenticado.
     */
    public function storeFromCart()
    {
        try {
            $user = auth()->user();
            $cart = $user->cart()->with('items.comic')->first();

            if (!$cart || $cart->items->isEmpty()) {
                return response()->json(['message' => 'El carrito está vacío.'], 400);
            }

            $total = $cart->items->sum(fn($item) => $item->quantity * $item->comic->price);

            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
            ]);

            $orderItems = [];

            foreach ($cart->items as $item) {
                $orderItems[] = [
                    'order_id' => $order->id,
                    'product_id' => $item->comic->id,
                    'quantity' => $item->quantity,
                    'price' => $item->comic->price,
                    'total' => $item->quantity * $item->comic->price,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            OrderItem::insert($orderItems);

            $cart->items()->delete();

            return response()->json([
                'message' => 'Pedido creado correctamente.',
                'order_id' => $order->id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear el pedido: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Devuelve el historial de pedidos del usuario autenticado.
     */
    public function history()
    {
        try {
            $user = auth()->user();
            $orders = $user->orders()->with('items.product')->latest()->get();

            $formatted = $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'comic_id' => $item->product_id,
                            'title' => $item->product->title ?? '(Producto eliminado)',
                            'image' => $item->product->image ?? null, 
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'total' => $item->total,
                        ];
                    }),
                ];
            });

            return response()->json($formatted);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener el historial: ' . $e->getMessage(),
            ], 500);
        }
    }
}
