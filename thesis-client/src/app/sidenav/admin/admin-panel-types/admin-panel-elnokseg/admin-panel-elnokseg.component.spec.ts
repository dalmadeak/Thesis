import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelElnoksegComponent } from './admin-panel-elnokseg.component';

describe('AdminPanelElnoksegComponent', () => {
  let component: AdminPanelElnoksegComponent;
  let fixture: ComponentFixture<AdminPanelElnoksegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelElnoksegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelElnoksegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
