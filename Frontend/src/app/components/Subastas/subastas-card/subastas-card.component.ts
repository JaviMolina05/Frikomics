import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Auction } from './../../../model/auction/auction.model';
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
  lastBid?: Bid;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLatestBid();
  }

  placeBid() {
    const bid: Bid = {
      auction_id: this.auction.id!,
      amount: this.bidAmount,
    };

    this.http.post<Bid>('http://localhost:8000/api/bids', bid).subscribe({
      next: (response) => {
        alert('Puja realizada con éxito');
        this.bidAmount = 0;
        this.fetchLatestBid(); 
        this.auction.current_price = response.amount;
      },
      error: (err) => {
        alert(err.error.message || 'Error al pujar');
      },
    });
  }

  fetchLatestBid() {
    this.http
      .get<Bid[]>(`http://localhost:8000/api/bids/${this.auction.id}`)
      .subscribe((bids) => {
        if (bids.length > 0) {
          this.lastBid = bids[0];
        }
      });
  }
}


