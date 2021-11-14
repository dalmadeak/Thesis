import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesBeszamolokComponent } from './uj-bejegyzes-beszamolok.component';

describe('UjBejegyzesBeszamolokComponent', () => {
  let component: UjBejegyzesBeszamolokComponent;
  let fixture: ComponentFixture<UjBejegyzesBeszamolokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesBeszamolokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesBeszamolokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
