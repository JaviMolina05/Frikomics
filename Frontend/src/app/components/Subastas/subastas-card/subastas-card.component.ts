import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Auction } from './../../../model/auction/Auction.model';
import { Bid } from './../../../model/puja/bid.model';
@Component({
  selector: 'app-subastas-card',
  standalone: false,
  templateUrl: './subastas-card.component.html',
  styleUrl: './subastas-card.component.scss'
})
export class SubastasCardComponent {
   @Input() auction!: Auction;
  bidAmount: number = 0;

  constructor(private http: HttpClient) {}

  placeBid() {
    const bid: Bid = {
      auction_id: this.auction.id,
      amount: this.bidAmount,
    };

    this.http.post('http://localhost:8000/api/bids', bid).subscribe({
      next: (response) => {
        alert('Puja realizada con éxito');
        // opcionalmente: actualizar subasta actual con nueva puja
      },
      error: (err) => {
        alert(err.error.message || 'Error al pujar');
      },
    });
  }
}

