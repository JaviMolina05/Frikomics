<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BidController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'auction_id' => 'required|exists:auctions,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $auction = Auction::with('bids')->findOrFail($request->auction_id);

        // Verificar si la subasta está activa y vigente
        if (!$auction->active || now()->lt($auction->start_time) || now()->gt($auction->end_time)) {
            return response()->json(['message' => 'La subasta no está activa o ya ha finalizado'], 403);
        }

        // Verificar si el monto supera al actual
        $currentPrice = $auction->current_price ?? $auction->starting_price;

        if ($request->amount <= $currentPrice) {
            return response()->json(['message' => 'La puja debe ser mayor al precio actual'], 422);
        }

        $bid = Bid::create([
            'auction_id' => $auction->id,
            'user_id' => Auth::id(), // Asegúrate de tener Auth configurado
            'amount' => $request->amount,
        ]);

        // Actualizar el precio actual de la subasta
        $auction->update(['current_price' => $request->amount]);

        // broadcast(new NewBidPlaced($bid))->toOthers();

        return response()->json($bid, 201);
    }

    public function index($auctionId)
    {
        $bids = Bid::with('user')
            ->where('auction_id', $auctionId)
            ->orderByDesc('amount')
            ->get();

        return response()->json($bids);
    }
}
