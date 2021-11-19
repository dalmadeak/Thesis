import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelBizottsagokComponent } from './admin-panel-bizottsagok.component';

describe('AdminPanelBizottsagokComponent', () => {
  let component: AdminPanelBizottsagokComponent;
  let fixture: ComponentFixture<AdminPanelBizottsagokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelBizottsagokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelBizottsagokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
