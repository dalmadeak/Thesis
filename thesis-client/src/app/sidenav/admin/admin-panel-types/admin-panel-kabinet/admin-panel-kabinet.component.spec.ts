import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelKabinetComponent } from './admin-panel-kabinet.component';

describe('AdminPanelKabinetComponent', () => {
  let component: AdminPanelKabinetComponent;
  let fixture: ComponentFixture<AdminPanelKabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelKabinetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelKabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
