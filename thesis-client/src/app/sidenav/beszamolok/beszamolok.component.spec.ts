import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeszamolokComponent } from './beszamolok.component';

describe('BeszamolokComponent', () => {
  let component: BeszamolokComponent;
  let fixture: ComponentFixture<BeszamolokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeszamolokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeszamolokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
