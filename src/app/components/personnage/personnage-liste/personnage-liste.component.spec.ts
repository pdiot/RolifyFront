import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnageListeComponent } from './personnage-liste.component';

describe('PersonnageListeComponent', () => {
  let component: PersonnageListeComponent;
  let fixture: ComponentFixture<PersonnageListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnageListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnageListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
