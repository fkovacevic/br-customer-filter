import { Injectable } from '@angular/core';

import { AppEvent } from '../models/viewModels/appEvent.viewModel';
import { API_URL } from '../constants/apiUrl';

type EventsResponse = {
  events: AppEvent[];
};

@Injectable({ providedIn: 'root' })
export class EventsService {
  async getEvents(): Promise<AppEvent[]> {
    const res = await fetch(`${API_URL}/customer-events/events.json`);

    const data: EventsResponse = await res.json();
    return data.events as AppEvent[];
  }
}
