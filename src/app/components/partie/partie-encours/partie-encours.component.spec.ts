import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieEncoursComponent } from './partie-encours.component';

describe('PartieEncoursComponent', () => {
  let component: PartieEncoursComponent;
  let fixture: ComponentFixture<PartieEncoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieEncoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
