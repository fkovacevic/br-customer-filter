import { Component, inject, signal } from '@angular/core';

import { Button } from '../../components/button/button';
import { ErrorComponent } from '../../components/error/error';

import { EventsService } from '../../services/events';

import { AppEvent } from '../../models/viewModels/appEvent.viewModel';

import { CustomerFilterStore } from './customer-filter.store';
import { FunnelStepComponent } from './funnel-step/funnel-step';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-customer-filter',
  imports: [Button, FunnelStepComponent, Header, Footer, ErrorComponent],
  templateUrl: './customer-filter.html',
  styleUrl: './customer-filter.scss',
})
export class CustomerFilter {
  protected store = inject(CustomerFilterStore);
  private eventsService = inject(EventsService);

  protected events = signal<AppEvent[]>([]);
  protected error = signal<string | null>(null);
  protected loading = signal(false);

  async ngOnInit() {
    try {
      this.loading.set(true)
      this.events.set(await this.eventsService.getEvents());
    } catch (e) {
      this.error.set('Failed to load events. Please try again.');
    } finally {
      this.loading.set(false);
    }
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

