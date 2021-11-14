import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesPalyazatokComponent } from './uj-bejegyzes-palyazatok.component';

describe('UjBejegyzesPalyazatokComponent', () => {
  let component: UjBejegyzesPalyazatokComponent;
  let fixture: ComponentFixture<UjBejegyzesPalyazatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesPalyazatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesPalyazatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
