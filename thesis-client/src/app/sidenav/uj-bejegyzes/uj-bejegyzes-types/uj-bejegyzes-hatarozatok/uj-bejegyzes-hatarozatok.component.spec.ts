import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjBejegyzesHatarozatokComponent } from './uj-bejegyzes-hatarozatok.component';

describe('UjBejegyzesHatarozatokComponent', () => {
  let component: UjBejegyzesHatarozatokComponent;
  let fixture: ComponentFixture<UjBejegyzesHatarozatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjBejegyzesHatarozatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UjBejegyzesHatarozatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
