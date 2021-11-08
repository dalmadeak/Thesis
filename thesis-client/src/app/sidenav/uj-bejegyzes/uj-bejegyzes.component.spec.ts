import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesComponent } from './uj-bejegyzes.component';

describe('UjBejegyzesComponent', () => {
  let component: UjBejegyzesComponent;
  let fixture: ComponentFixture<UjBejegyzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
