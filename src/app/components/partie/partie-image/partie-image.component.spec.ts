import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieImageComponent } from './partie-image.component';

describe('PartieImageComponent', () => {
  let component: PartieImageComponent;
  let fixture: ComponentFixture<PartieImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
