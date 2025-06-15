import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BidService } from './bid.service';
import { Bid } from '../model/puja/bid.model';

describe('BidService', () => {
  let service: BidService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BidService]
    });

    service = TestBed.inject(BidService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place a bid', () => {
    const bidToSend: Bid = {
      auction_id: 1,
      amount: 100
    };

    const mockResponse: Bid = {
      id: 10,
      auction_id: 1,
      user_id: 5,
      amount: 100,
      is_winning_bid: false,
      created_at: '2024-06-01T12:00:00Z',
      updated_at: '2024-06-01T12:00:00Z'
    };

    service.placeBid(bidToSend).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/bids');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(bidToSend);
    req.flush(mockResponse);
  });

  it('should fetch bids by auction ID', () => {
    const auctionId = 1;
    const mockBids: Bid[] = [
      {
        id: 1,
        auction_id: 1,
        user_id: 3,
        amount: 150,
        is_winning_bid: false,
        created_at: '2024-06-10T10:00:00Z',
        updated_at: '2024-06-10T10:00:00Z'
      },
      {
        id: 2,
        auction_id: 1,
        user_id: 4,
        amount: 200,
        is_winning_bid: true,
        created_at: '2024-06-11T11:30:00Z',
        updated_at: '2024-06-11T11:30:00Z'
      }
    ];

    service.getBidsByAuction(auctionId).subscribe((bids) => {
      expect(bids.length).toBe(2);
      expect(bids).toEqual(mockBids);
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/bids/${auctionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBids);
  });
});
