import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  checkWinnerNotification(): Observable<{ message: string; auction_id: number } | null> {
    return this.http.get<{ message: string; auction_id: number } | null>(
      `${this.apiUrl}/check-winner-notification`
    );
  }
}
