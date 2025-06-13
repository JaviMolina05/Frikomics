import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-hitorial-pedidos',
  standalone: false,
  templateUrl: './hitorial-pedidos.component.html',
  styleUrl: './hitorial-pedidos.component.scss'
})
export class HitorialPedidosComponent {
  pedidos: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderHistory().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => {
        console.error('Error al cargar historial de pedidos', err);
      }
    });
  }
}
