import { TestBed, inject } from '@angular/core/testing';

import { ChatGlobalService } from './chat-global.service';

describe('ChatGlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGlobalService]
    });
  });

  it('should be created', inject([ChatGlobalService], (service: ChatGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
