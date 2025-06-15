<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function index()
    {
        $now = now();
        Auction::where('active', true)
            ->where('end_time', '<=', $now)
            ->update(['active' => false]);

        return Auction::with('bids', 'winner')->where('active', true)->get();
    }


    public function show($id)
    {
        return Auction::with('bids', 'winner')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'condition' => 'required|in:perfecto,buen estado,regular,muy usado',
            'seller_note' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'starting_price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);


        $imagePath = $request->file('image')->store('auctions', 'public');

        $auction = Auction::create([
            'title' => $request->title,
            'condition' => $request->condition,
            'seller_note' => $request->seller_note,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'starting_price' => $request->starting_price,
            'current_price' => $request->starting_price,
            'image' => $imagePath,
            'active' => true,
        ]);


        return response()->json($auction, 201);
    }

    public function update(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'condition' => 'sometimes|required|in:perfecto,buen estado,regular,muy usado',
            'seller_note' => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'starting_price' => 'nullable|numeric|min:0',
            'current_price' => 'nullable|numeric|min:0',
            'image' => 'nullable|string',
            'active' => 'nullable|boolean',
        ]);

        $auction->update($request->all());

        return response()->json($auction);
    }

    public function destroy($id)
    {
        $auction = Auction::findOrFail($id);
        $auction->delete();

        return response()->json(['message' => 'Subasta eliminada correctamente']);
    }

    public function checkWinnerNotification()
    {
        $user = auth()->user();

        // Buscar una subasta ganada no vista aún
        $auction = Auction::where('winner_id', $user->id)
            ->where('notified', true)
            ->where('seen', false)
            ->latest()
            ->first();

        if ($auction) {
            // Marcarla como vista
            $auction->seen = true;
            $auction->save();

            return response()->json([
                'message' => '¡Has ganado la subasta de: ' . $auction->title . '!',
                'auction_id' => $auction->id,
            ]);
        }

        return response()->json(null);
    }
}
