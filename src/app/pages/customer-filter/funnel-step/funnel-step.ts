import { Component, inject, Input } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { FunnelStep } from '../../../models/formModels/funnelStep.formModel';
import { AppEvent, EventProperty } from '../../../models/viewModels/appEvent.viewModel';
import { CustomerFilterStore } from '../customer-filter.store';
import { EventAttributeComponent } from './event-attribute/event-attribute';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-funnel-step',
  imports: [Dropdown, Button, EventAttributeComponent, NgIcon],
  templateUrl: './funnel-step.html',
  styleUrl: './funnel-step.scss',
})
export class FunnelStepComponent {
  @Input() step!: FunnelStep;
  @Input() eventTypes: AppEvent[] = [];
  @Input() index!: number;
  private store = inject(CustomerFilterStore);

  get eventTypeOptions(): string[] {
    return this.eventTypes.map(e => e.type);
  }

  get selectedEventProperties(): EventProperty[] {
    const selectedEvent = this.eventTypes.find(e => e.type === this.step.event);
    return selectedEvent?.properties ?? [];
  }

  onEventTypeChange(value: string): void {
    this.store.editFunnelStep(this.step.id, { event: value, attributes: [] });
  }

  addEventAttribute(funnelStepId: string): void {
    this.store.addEventAttribute(funnelStepId);
  }

  copyFunnelStep(): void {
    this.store.copyFunnelStep(this.step.id);
  }

  deleteFunnelStep(): void {
    this.store.deleteFunnelStep(this.step.id);
  }
}
