import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesUlesekComponent } from './uj-bejegyzes-ulesek.component';

describe('UjBejegyzesUlesekComponent', () => {
  let component: UjBejegyzesUlesekComponent;
  let fixture: ComponentFixture<UjBejegyzesUlesekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesUlesekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesUlesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
