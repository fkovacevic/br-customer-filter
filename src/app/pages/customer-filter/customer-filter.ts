import { Component, EventEmitter, inject, signal } from '@angular/core';
import { CustomerFilterStore } from './customer-filter.store';
import { Button } from '../../components/button/button';
import { EventsService } from '../../services/events';
import { AppEvent } from '../../models/viewModels/appEvent.viewModel';
import { FunnelStepComponent } from './funnel-step/funnel-step';
import { Header } from './header/header';

@Component({
  selector: 'app-customer-filter',
  imports: [Button, FunnelStepComponent, Header],
  templateUrl: './customer-filter.html',
  styleUrl: './customer-filter.scss',
})
export class CustomerFilter {
  protected store = inject(CustomerFilterStore);
  private eventsService = inject(EventsService);

  protected events = signal<AppEvent[]>([]);

  async ngOnInit() {
    this.events.set(await this.eventsService.getEvents());
  }

  addFunnelStep(): void {
    this.store.addFunnelStep();
  }

  resetFunnelSteps(): void {
    this.store.resetFunnelSteps();
  }

  apply(): void {
    console.log(this.store.funnelSteps())
  }
}

