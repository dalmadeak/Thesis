import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorompoAdminComponent } from './sorompo-admin.component';

describe('SorompoAdminComponent', () => {
  let component: SorompoAdminComponent;
  let fixture: ComponentFixture<SorompoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorompoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorompoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
