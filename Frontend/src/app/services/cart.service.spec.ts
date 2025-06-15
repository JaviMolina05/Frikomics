import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { CartItem } from '../model/cart-item/cart-item';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart and emit cartChanged', (done) => {
    const productId = 1;
    const quantity = 2;
    const mockResponse = { success: true };

    service.cartChanged$.subscribe(() => {
      expect(true).toBeTrue(); // Se emite evento de cambio
      done();
    });

    service.addToCart(productId, quantity).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/cart-items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ product_id: productId, quantity });
    req.flush(mockResponse);
  });

  it('should fetch cart by user ID', () => {
    const userId = 1;
    const mockCart = {
      items: [
        {
          comic_id: 1,
          title: 'Comic One',
          price: '10',
          quantity: 2,
          total_price: 20
        }
      ]
    };

    service.getCart(userId).subscribe(cart => {
      expect(cart).toEqual(mockCart);
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/cart/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCart);
  });

  it('should update a cart item and emit cartChanged', (done) => {
    const userId = 1;
    const item: CartItem = {
      comic_id: 1,
      title: 'Comic One',
      price: '10',
      quantity: 3,
      total_price: 30
    };
    const mockResponse = { success: true };

    service.cartChanged$.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    service.updateCartItem(userId, item).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/cart-items/${item.comic_id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ product_id: item.comic_id, quantity: item.quantity });
    req.flush(mockResponse);
  });

  it('should remove an item and emit cartChanged', (done) => {
    const itemId = 1;
    const mockResponse = { success: true };

    service.cartChanged$.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    service.removeItem(itemId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/cart-items/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should clear the cart and emit cartChanged', (done) => {
    const mockResponse = { success: true };

    service.cartChanged$.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    service.clearCart().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/cart/clear');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
