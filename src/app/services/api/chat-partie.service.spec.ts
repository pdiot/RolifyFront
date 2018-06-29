import { TestBed, inject } from '@angular/core/testing';

import { ChatPartieService } from './chat-partie.service';

describe('ChatPartieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatPartieService]
    });
  });

  it('should be created', inject([ChatPartieService], (service: ChatPartieService) => {
    expect(service).toBeTruthy();
  }));
});
