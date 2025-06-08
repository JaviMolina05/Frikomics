import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subastas-form',
  standalone: false,
  templateUrl: './subastas-form.component.html',
  styleUrl: './subastas-form.component.scss'
})
export class SubastasFormComponent {
  auction = {
    title: '',
    condition: '',
    seller_note: '',
    starting_price: null as number | null,
    start_time: '',
    end_time: '',
    image: null as File | null
  };

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.auction.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.auction.title);
    formData.append('condition', this.auction.condition);
    formData.append('seller_note', this.auction.seller_note || '');
    formData.append('start_time', this.auction.start_time);
    formData.append('end_time', this.auction.end_time);
    if (this.auction.starting_price !== null) {
      formData.append('starting_price', this.auction.starting_price.toString());
    }
    if (this.auction.image) {
      formData.append('image', this.auction.image);
    }

    this.http.post('http://localhost:8000/api/auctions', formData).subscribe({
      next: () => alert('Subasta creada con éxito'),
      error: err => alert(err.error.message || 'Error al crear subasta')
    });
  }
}
