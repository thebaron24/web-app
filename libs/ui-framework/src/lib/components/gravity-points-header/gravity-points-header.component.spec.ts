import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityPointsHeaderComponent } from './gravity-points-header.component';

describe('GravityPointsHeaderComponent', () => {
  let component: GravityPointsHeaderComponent;
  let fixture: ComponentFixture<GravityPointsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravityPointsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityPointsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
