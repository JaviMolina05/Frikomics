import { Component } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';
import { AuctionService } from '../../../services/auction.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subastas-form',
  standalone: false,
  templateUrl: './subastas-form.component.html',
  styleUrl: './subastas-form.component.scss'
})
export class SubastasFormComponent {
  auction = {
  comic_id: '',
  starting_price: null,
  start_time: '',
  end_time: '',
  image: null
};

constructor(private http: HttpClient){}

comics: Comic[] = [];
  comicService: any;

ngOnInit() {
  this.loadAvailableComics();
}

loadAvailableComics() {
  this.comicService.getComics().subscribe((data: Comic[]) => {
    this.comics = data;
  });
}

onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.auction.image = file;
  }
}

onSubmit() {
  const formData = new FormData();
  formData.append('comic_id', this.auction.comic_id);
  if (this.auction.starting_price !== null && this.auction.starting_price !== undefined) {
  formData.append('starting_price', this.auction.starting_price);
}
  formData.append('start_time', this.auction.start_time);
  formData.append('end_time', this.auction.end_time);
  if (this.auction.image) {
    formData.append('image', this.auction.image);
  }

  
  this.http.post('http://localhost:8000/api/auction', formData).subscribe(
    res => console.log('Comic creado', res),
    err => console.error('Error al crear comic', err)
  );
}

}
