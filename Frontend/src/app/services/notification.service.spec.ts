import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a winner notification object from API', () => {
    const mockResponse = { message: 'You won!', auction_id: 42 };

    service.checkWinnerNotification().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/check-winner-notification');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return null if there is no winner notification', () => {
    service.checkWinnerNotification().subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8000/api/check-winner-notification');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
