import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValasztasokComponent } from './valasztasok.component';

describe('ValasztasokComponent', () => {
  let component: ValasztasokComponent;
  let fixture: ComponentFixture<ValasztasokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValasztasokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValasztasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
