import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnagePreviewComponent } from './personnage-preview.component';

describe('PersonnagePreviewComponent', () => {
  let component: PersonnagePreviewComponent;
  let fixture: ComponentFixture<PersonnagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
