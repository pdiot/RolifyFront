import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieListeComponent } from './partie-liste.component';

describe('PartieListeComponent', () => {
  let component: PartieListeComponent;
  let fixture: ComponentFixture<PartieListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
