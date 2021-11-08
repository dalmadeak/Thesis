import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HatarozatokComponent } from './hatarozatok.component';

describe('HatarozatokComponent', () => {
  let component: HatarozatokComponent;
  let fixture: ComponentFixture<HatarozatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HatarozatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HatarozatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
