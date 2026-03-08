import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroTrash,
  heroDocumentDuplicate,
  heroPencilSquare,
  heroXMark,
} from '@ng-icons/heroicons/outline';

import { AppEvent } from '../../models/viewModels/appEvent.viewModel';

import { CustomerFilter } from './customer-filter';

import { EventsService } from '../../services/events';

const mockEvents: AppEvent[] = [
  { type: 'page_visit', properties: [{ property: 'browser', type: 'string' }] },
];

describe('CustomerFilter', () => {
  let component: CustomerFilter;
  let fixture: ComponentFixture<CustomerFilter>;
  let eventsServiceMock: { getEvents: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    eventsServiceMock = {
      getEvents: vi.fn().mockResolvedValue(mockEvents),
    };

    await TestBed.configureTestingModule({
      imports: [CustomerFilter],
      providers: [
        { provide: EventsService, useValue: eventsServiceMock },
        provideIcons({ heroChevronDown, heroTrash, heroDocumentDuplicate, heroPencilSquare, heroXMark }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should call getEvents on init', () => {
    expect(eventsServiceMock.getEvents).toHaveBeenCalledOnce();
  });

  it('should render funnel steps', () => {
    const funnelSteps = fixture.nativeElement.querySelectorAll('app-funnel-step');
    expect(funnelSteps.length).toBeGreaterThan(0);
  });

  it('should add a funnel step when add button is clicked', async () => {
    const initialCount = fixture.nativeElement.querySelectorAll('app-funnel-step').length;
    component.addFunnelStep();
    fixture.detectChanges();
    const newCount = fixture.nativeElement.querySelectorAll('app-funnel-step').length;
    expect(newCount).toBe(initialCount + 1);
  });

  it('should show error when events fail to load', async () => {
    eventsServiceMock.getEvents.mockRejectedValue(new Error('Network error'));
    await component.ngOnInit();
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('app-error');
    expect(errorEl).toBeTruthy();
  });

  it('should reset funnel steps on reset', () => {
    component.addFunnelStep();
    component.addFunnelStep();
    fixture.detectChanges();
    component.resetFunnelSteps();
    fixture.detectChanges();
    const funnelSteps = fixture.nativeElement.querySelectorAll('app-funnel-step');
    expect(funnelSteps.length).toBe(1);
  });
});
