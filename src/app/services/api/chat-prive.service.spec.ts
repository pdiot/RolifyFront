import { TestBed, inject } from '@angular/core/testing';

import { ChatPriveService } from './chat-prive.service';

describe('ChatPriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatPriveService]
    });
  });

  it('should be created', inject([ChatPriveService], (service: ChatPriveService) => {
    expect(service).toBeTruthy();
  }));
});
