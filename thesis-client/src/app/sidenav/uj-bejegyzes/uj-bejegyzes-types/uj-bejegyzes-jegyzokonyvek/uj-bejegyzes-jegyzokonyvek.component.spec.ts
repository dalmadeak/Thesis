import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesJegyzokonyvekComponent } from './uj-bejegyzes-jegyzokonyvek.component';

describe('UjBejegyzesJegyzokonyvekComponent', () => {
  let component: UjBejegyzesJegyzokonyvekComponent;
  let fixture: ComponentFixture<UjBejegyzesJegyzokonyvekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesJegyzokonyvekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesJegyzokonyvekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
