import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieFormComponent } from './partie-form.component';

describe('PartieFormComponent', () => {
  let component: PartieFormComponent;
  let fixture: ComponentFixture<PartieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
