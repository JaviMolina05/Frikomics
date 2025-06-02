<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\Comic;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function index()
    {
        return Auction::with(['comic', 'bids'])->get();
    }

    public function show($id)
    {
        return Auction::with(['comic', 'bids'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'comic_id' => 'required|exists:comics,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'starting_price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
        ]);

        $auction = Auction::create([
            'comic_id' => $request->comic_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'starting_price' => $request->starting_price,
            'current_price' => $request->starting_price,
            'image' => $request->image,
            'active' => true,
        ]);

        return response()->json($auction, 201);
    }

    public function update(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);

        $request->validate([
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'starting_price' => 'nullable|numeric|min:0',
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
}

