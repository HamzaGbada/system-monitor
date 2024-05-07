import { TestBed } from '@angular/core/testing';

import { MonitorWebSocketService } from './monitor-web-socket.service';

describe('MonitorWebSocketService', () => {
  let service: MonitorWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
