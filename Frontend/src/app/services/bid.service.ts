import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from './../model/puja/bid.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private apiUrl = 'http://localhost:8000/api/bids';

  constructor(private http: HttpClient) {}

  placeBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(this.apiUrl, bid);
  }

  getBidsByAuction(auctionId: number): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.apiUrl}/${auctionId}`);
  }
}
