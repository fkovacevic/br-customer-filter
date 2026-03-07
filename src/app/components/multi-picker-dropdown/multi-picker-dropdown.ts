import { Component, Input, Output, EventEmitter, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";

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
  imports: [CommonModule],
  templateUrl: "./multi-picker-dropdown.html",
  styleUrl: "./multi-picker-dropdown.scss",
})
export class MultiPickerDropdown {
  @Input() groups: PickerGroup[] = [];
  @Input() selectedGroupId: string | null = null;
  @Output() selectedGroupIdChange = new EventEmitter<string | null>();
  @Input() selectedOption: string | null = null;
  @Output() selectedOptionChange = new EventEmitter<string | null>();
  isOpen = signal(false);
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
  get activeGroup(): PickerGroup | undefined {
    return this.groups.find((g) => g.id === this.selectedGroupId);
  }
}
