import { Component, Input, Output, EventEmitter, signal, ElementRef, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIcon } from "@ng-icons/core";

export type PickerOption = {
  id: string;
  label: string;
};

export type PickerGroup = {
  id: string;
  label: string;
  icon: string;
  options: PickerOption[];
};

@Component({
  selector: "app-multi-picker-dropdown",
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: "./multi-picker-dropdown.html",
  styleUrl: "./multi-picker-dropdown.scss",
})
export class MultiPickerDropdown {
  @Input() groups: PickerGroup[] = [];
  @Input() selectedGroupId: string | null = null;
  @Output() selectedGroupIdChange = new EventEmitter<string | null>();
  @Input() selectedOption: string | null = null;
  @Output() selectedOptionChange = new EventEmitter<string | null>();

  private elementRef = inject(ElementRef);

  isOpen = signal(false);


  get activeGroup(): PickerGroup | undefined {
    return this.groups.find((g) => g.id === this.selectedGroupId);
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }

  selectGroup(id: string) {
    this.selectedGroupIdChange.emit(id);
    this.selectedOptionChange.emit(null);
  }

  selectOption(option: PickerOption) {
    this.selectedOptionChange.emit(option.id);
    this.isOpen.set(false);
  }

  onBlur(event: FocusEvent) {
    if (this.elementRef.nativeElement.contains(event.relatedTarget as Node)) {
      return;
    }
    this.isOpen.set(false);
  }
}
