import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
 constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.startPollingForWinner();
  }

  startPollingForWinner(): void {
    setInterval(() => {
      this.notificationService.checkWinnerNotification().subscribe((res) => {
        if (res?.message) {

          alert(res.message);

   
        }
      });
    }, 10000); 
  }}
