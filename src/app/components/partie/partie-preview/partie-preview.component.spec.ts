import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiePreviewComponent } from './partie-preview.component';

describe('PartiePreviewComponent', () => {
  let component: PartiePreviewComponent;
  let fixture: ComponentFixture<PartiePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
