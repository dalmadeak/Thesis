import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelKuldottgyulesComponent } from './admin-panel-kuldottgyules.component';

describe('AdminPanelKuldottgyulesComponent', () => {
  let component: AdminPanelKuldottgyulesComponent;
  let fixture: ComponentFixture<AdminPanelKuldottgyulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelKuldottgyulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelKuldottgyulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
