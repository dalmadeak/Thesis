import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesSajatBeszamolokComponent } from './uj-bejegyzes-sajat-beszamolok.component';

describe('UjBejegyzesSajatBeszamolokComponent', () => {
  let component: UjBejegyzesSajatBeszamolokComponent;
  let fixture: ComponentFixture<UjBejegyzesSajatBeszamolokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesSajatBeszamolokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesSajatBeszamolokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
