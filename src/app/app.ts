import { Component, signal } from "@angular/core";
import { Dropdown } from "./components/dropdown/dropdown";
import { Button } from "./components/button/button";
import { MultiPickerDropdown } from "./components/multi-picker-dropdown/multi-picker-dropdown";
import { EventsService } from "./services/events";
import { AppEvent } from "./models/viewModels/appEvent.viewModel";
import { CustomerFilter } from "./pages/customer-filter/customer-filter";

@Component({
  selector: "app-root",
  imports: [Dropdown, Button, MultiPickerDropdown, CustomerFilter],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("customer-filter");

  events = signal<AppEvent[]>([]);
  loading = signal(true);


  constructor(private eventsService: EventsService) { }

  async ngOnInit() {
    this.loading.set(true);
    const events = await this.eventsService.getEvents();
    this.events.set(events);
    this.loading.set(false);
  }

  onButtonClick = () => console.log(crypto.randomUUID());
  selectedGroupId: string | null = "string";
  selectedOption: string | null = null;

  groups = [
    {
      id: "string",
      label: "STRING",
      icon: "T",
      options: ["equals", "not equals", "contains", "does not contain"],
    },
    {
      id: "number",
      label: "NUMBER",
      icon: "#",
      options: ["equal to", "in between", "less than", "greater than"],
    },
  ];
}
