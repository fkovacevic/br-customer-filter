import { CommonModule } from "@angular/common";
import { Component, computed, ElementRef, EventEmitter, inject, Input, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { heroChevronDown } from "@ng-icons/heroicons/outline";

@Component({
  selector: "app-dropdown",
  imports: [FormsModule, CommonModule, NgIconComponent],
  providers: [provideIcons({ heroChevronDown })],
  templateUrl: "./dropdown.html",
  styleUrl: "./dropdown.scss",
})
export class Dropdown {
  @Input() placeholder = "Select...";
  @Input() options: string[] = [];
  @Input() searchable = false;
  @Input() value: string | null = null;
  @Input() prefix: string | null = null;
  @Output() onSelect = new EventEmitter<string>();

  private elementRef = inject(ElementRef);

  isOpen = signal(false);
  searchQuery = signal("");

  filteredOptions = computed(() =>
    this.options.filter((_option) =>
      _option.toLowerCase().includes(this.searchQuery().toLowerCase()),
    ),
  );

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  select(option: string) {
    this.isOpen.set(false);
    this.searchQuery.set("");
    this.onSelect.emit(option);
  }

  onBlur(event: FocusEvent) {
    if (
      this.elementRef.nativeElement.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    this.isOpen.set(false);
  }
}
