import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Order } from '../model/order/order.module';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to create order from cart', () => {
    const mockResponse = { success: true, orderId: 123 };

    service.createOrderFromCart().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(mockResponse);
  });

  it('should fetch order history as an array of orders', () => {
    const mockOrders: Order[] = [
      { comic_id: 101, title: 'Comic One', quantity: 2, price: 25.5, total: 51.0 },
      { comic_id: 102, title: 'Comic Two', quantity: 3, price: 30.0, total: 90.0 },
    ];

    service.getOrderHistory().subscribe((orders) => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

});
