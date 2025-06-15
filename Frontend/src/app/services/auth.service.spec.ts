import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    data: {
      accessToken: 'fake-token',
      user: {
        id: 1,
        name: 'Test User',
        role: 'admin'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token and user in localStorage', (done) => {
    const credentials = { email: 'test@example.com', password: '123456' };

    service.userChanged$.subscribe(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      expect(storedUser.name).toBe('Test User');
      done();
    });

    service.login(credentials).subscribe();

    const req = httpMock.expectOne('http://localhost:8000/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear localStorage', (done) => {
    // Prellenar localStorage
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify(mockResponse.data.user));

    service.userChanged$.subscribe(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      done();
    });

    service.logout();
  });

  it('should return true if token exists in localStorage', () => {
    localStorage.setItem('token', 'abc123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if token does not exist in localStorage', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return user ID from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ id: 42 }));
    expect(service.getUserId()).toBe(42);
  });

  it('should return null if user is not in localStorage', () => {
    expect(service.getUserId()).toBeNull();
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'my-token');
    expect(service.getToken()).toBe('my-token');
  });

  it('should return null if no token in localStorage', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should return true if user is admin', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
    expect(service.isAdmin()).toBeTrue();
  });

  it('should return false if user is not admin', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'user' }));
    expect(service.isAdmin()).toBeFalse();
  });

  it('should return false if no user in localStorage', () => {
    expect(service.isAdmin()).toBeFalse();
  });
});
