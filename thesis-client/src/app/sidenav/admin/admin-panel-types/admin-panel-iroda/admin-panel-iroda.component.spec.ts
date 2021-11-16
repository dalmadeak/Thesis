import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelIrodaComponent } from './admin-panel-iroda.component';

describe('AdminPanelIrodaComponent', () => {
  let component: AdminPanelIrodaComponent;
  let fixture: ComponentFixture<AdminPanelIrodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelIrodaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelIrodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
