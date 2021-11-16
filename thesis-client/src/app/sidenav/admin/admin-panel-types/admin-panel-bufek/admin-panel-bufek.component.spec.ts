import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelBufekComponent } from './admin-panel-bufek.component';

describe('AdminPanelBufekComponent', () => {
  let component: AdminPanelBufekComponent;
  let fixture: ComponentFixture<AdminPanelBufekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelBufekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelBufekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
