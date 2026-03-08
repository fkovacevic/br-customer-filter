import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttribute } from './event-attribute';

describe('EventAttribute', () => {
  let component: EventAttribute;
  let fixture: ComponentFixture<EventAttribute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAttribute],
    }).compileComponents();

    fixture = TestBed.createComponent(EventAttribute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
