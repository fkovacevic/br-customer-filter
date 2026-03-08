import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelStep } from './funnel-step';

describe('FunnelStep', () => {
  let component: FunnelStep;
  let fixture: ComponentFixture<FunnelStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnelStep],
    }).compileComponents();

    fixture = TestBed.createComponent(FunnelStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
