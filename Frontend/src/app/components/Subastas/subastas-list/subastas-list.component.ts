
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Auction } from '../../../model/auction/auction.model';
import { AuctionService } from '../../../services/auction.service';

@Component({
  selector: 'app-subastas-list',
  standalone: false,
  templateUrl: './subastas-list.component.html',
  styleUrl: './subastas-list.component.scss'
})
export class SubastasListComponent {
  auctions: Auction[] = [];
  isSidebarOpen = false;

  constructor(
    private auctionService: AuctionService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data;
      },
      error: (err) => console.error('Error cargando subastas', err)
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  trackById(index: number, auction: Auction) {
    return auction.id;
  }
}
