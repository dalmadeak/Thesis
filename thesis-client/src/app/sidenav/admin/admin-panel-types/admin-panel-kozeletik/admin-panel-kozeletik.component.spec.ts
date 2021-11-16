import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelKozeletikComponent } from './admin-panel-kozeletik.component';

describe('AdminPanelKozeletikComponent', () => {
  let component: AdminPanelKozeletikComponent;
  let fixture: ComponentFixture<AdminPanelKozeletikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelKozeletikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelKozeletikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
