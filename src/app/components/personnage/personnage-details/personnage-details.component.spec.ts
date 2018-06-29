import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnageDetailsComponent } from './personnage-details.component';

describe('PersonnageDetailsComponent', () => {
  let component: PersonnageDetailsComponent;
  let fixture: ComponentFixture<PersonnageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
