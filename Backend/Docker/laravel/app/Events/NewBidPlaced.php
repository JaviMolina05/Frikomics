<?php
namespace App\Events;

use App\Models\Bid;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewBidPlaced implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bid;

    /**
     * Create a new event instance.
     */
    public function __construct(Bid $bid)
    {
        $this->bid = $bid;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn()
    {
        // Puedes usar un canal público o privado según tu necesidad, por ejemplo:
        return new Channel('auction.' . $this->bid->auction_id);
    }

    public function broadcastWith()
    {
        return [
            'bid_id' => $this->bid->id,
            'user_id' => $this->bid->user_id,
            'auction_id' => $this->bid->auction_id,
            'amount' => $this->bid->amount,
            'created_at' => $this->bid->created_at->toDateTimeString(),
        ];
    }
}

