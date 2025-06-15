import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuctionService } from './auction.service';
import { Auction } from '../model/auction/auction.model';

describe('AuctionService', () => {
  let service: AuctionService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:8000/api/auctions';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuctionService]
    });

    service = TestBed.inject(AuctionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all auctions', () => {
    const mockAuctions: Auction[] = [
      {
        id: 1,
        title: 'Comic Auction 1',
        condition: 'buen estado',
        start_time: '2025-06-15T10:00:00Z',
        end_time: '2025-06-16T10:00:00Z',
        starting_price: 10,
      },
      {
        id: 2,
        title: 'Comic Auction 2',
        condition: 'perfecto',
        start_time: '2025-06-17T12:00:00Z',
        end_time: '2025-06-18T12:00:00Z',
        starting_price: 15,
      }
    ];

    service.getAuctions().subscribe((auctions) => {
      expect(auctions.length).toBe(2);
      expect(auctions).toEqual(mockAuctions);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuctions);
  });

  it('should fetch an auction by ID', () => {
    const mockAuction: Auction = {
      id: 1,
      title: 'Comic Auction',
      condition: 'buen estado',
      start_time: '2025-06-15T10:00:00Z',
      end_time: '2025-06-16T10:00:00Z',
      starting_price: 20,
    };

    service.getAuction(1).subscribe((auction) => {
      expect(auction).toEqual(mockAuction);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuction);
  });

  it('should create a new auction', () => {
    const formData = new FormData();
    formData.append('title', 'Nueva subasta');
    formData.append('condition', 'perfecto');
    formData.append('start_time', '2025-06-20T10:00:00Z');
    formData.append('end_time', '2025-06-21T10:00:00Z');
    formData.append('starting_price', '25');

    const mockResponse = { success: true };

    service.createAuction(formData).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush(mockResponse);
  });

  it('should update an auction', () => {
    const updatedData = {
      title: 'Updated Auction Title',
      condition: 'regular',
      start_time: '2025-06-22T10:00:00Z',
      end_time: '2025-06-23T10:00:00Z',
      starting_price: 30
    };

    const mockResponse = { success: true };

    service.updateAuction(1, updatedData).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);
    req.flush(mockResponse);
  });

  it('should delete an auction', () => {
    const mockResponse = { success: true };

    service.deleteAuction(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
