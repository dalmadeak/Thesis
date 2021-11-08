import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelepokartyaAdminComponent } from './belepokartya-admin.component';

describe('BelepokartyaAdminComponent', () => {
  let component: BelepokartyaAdminComponent;
  let fixture: ComponentFixture<BelepokartyaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelepokartyaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BelepokartyaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
