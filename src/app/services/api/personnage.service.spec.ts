import { TestBed, inject } from '@angular/core/testing';

import { PersonnageService } from './personnage.service';

describe('PersonnageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonnageService]
    });
  });

  it('should be created', inject([PersonnageService], (service: PersonnageService) => {
    expect(service).toBeTruthy();
  }));
});
