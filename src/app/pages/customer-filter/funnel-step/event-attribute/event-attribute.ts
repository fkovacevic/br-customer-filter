import { Component, inject, Input, signal } from '@angular/core';
import { AttributeValueInputComponent } from './attribute-value-input/attribute-value-input';
import { Dropdown } from '../../../../components/dropdown/dropdown';
import { MultiPickerDropdown } from '../../../../components/multi-picker-dropdown/multi-picker-dropdown';
import { StringComparatorLabel, StringComparator, NumberOperatorLabel, NumberOperator, EventAttribute, isComparatorRange, isComparatorNumber, isComparatorText, isAttributeRange, isAttributeNumber, isAttributeText } from '../../../../models/formModels/funnelStep.formModel';
import { EventProperty } from '../../../../models/viewModels/appEvent.viewModel';
import { CustomerFilterStore } from '../../customer-filter.store';
import { Button } from '../../../../components/button/button';


const COMPARATOR_GROUPS = [
  {
    id: 'string',
    label: 'Text',
    icon: '🔤',
    options: Object.entries(StringComparatorLabel).map(([id, label]) => ({ id: id as StringComparator, label }))
  },
  {
    id: 'number',
    label: 'Number',
    icon: '🔢',
    options: Object.entries(NumberOperatorLabel).map(([id, label]) => ({ id: id as NumberOperator, label }))
  }
]

@Component({
  selector: 'app-event-attribute',
  standalone: true,
  templateUrl: './event-attribute.html',
  styleUrl: './event-attribute.scss',
  imports: [AttributeValueInputComponent, Dropdown, MultiPickerDropdown, Button],
})
export class EventAttributeComponent {
  @Input() attribute!: EventAttribute;
  @Input() funnelStepId!: string;
  @Input() properties: EventProperty[] = [];
  selectedGroupId = signal<string | null>(null);

  private store = inject(CustomerFilterStore);

  readonly comparatorGroups = COMPARATOR_GROUPS;

  // onValueChange(value: string): void {
  //   this.store.editEventAttribute(this.funnelStepId, this.attribute.id, { ...this.attribute, value });
  // }

  onPropertyChange(value: string): void {
    const selectedProperty = this.properties.find((_option) => _option.property === value);
    if (!selectedProperty) {
      return;
    }

    let newEventAttribute: EventAttribute;
    if (selectedProperty.type === 'string') {
      newEventAttribute = {
        id: this.attribute.id,
        comparator: StringComparator.EQUALS,
        property: value,
        value: '',
      }

      this.selectedGroupId.set(COMPARATOR_GROUPS[0].id);
    } else if (selectedProperty.type === 'number') {
      newEventAttribute = {
        id: this.attribute.id,
        comparator: NumberOperator.EQUAL_TO,
        property: value,
        value: 0,
      }

      this.selectedGroupId.set(COMPARATOR_GROUPS[1].id);
    } else {
      throw new Error('Property type not recognized');
    }

    this.store.editEventAttribute(this.funnelStepId, this.attribute.id, newEventAttribute);
  }

  get propertyOptions(): string[] {
    return this.properties.map(p => p.property);
  }


  onComparatorChange(value: string | null): void {
    if (!value) return;

    const _selectedGroup = this.comparatorGroups.find((_group) => _group.id === this.selectedGroupId());
    if (!_selectedGroup) {
      return;
    }

    const _selectedComparator = _selectedGroup.options.find((_option) => _option.id === value);
    if (!_selectedComparator) {
      return;
    }

    let newEventAttribute: EventAttribute;
    if (isComparatorRange(_selectedComparator.id)) {
      newEventAttribute = {
        ...this.attribute,
        comparator: NumberOperator.IN_BETWEEN,
        value: [0, 0]
      }
    } else if (isComparatorNumber(_selectedComparator.id)) {
      newEventAttribute = {
        ...this.attribute,
        comparator: _selectedComparator.id,
        value: 0,
      }
    } else if (isComparatorText(_selectedComparator.id)) {
      newEventAttribute = {
        ...this.attribute,
        comparator: _selectedComparator.id,
        value: '',
      }
    } else {
      throw new Error('Unrecognized comparator type');
    }

    this.store.editEventAttribute(this.funnelStepId, this.attribute.id, newEventAttribute);
  }

  onValueChange(value: string | number | [number, number]): void {
    if (!this.attribute.property) return;

    let newEventAttribute: EventAttribute;
    if (isAttributeRange(this.attribute)) {
      newEventAttribute = {
        ...this.attribute,
        value: value as [number, number]
      }
    } else if (isAttributeNumber(this.attribute)) {
      newEventAttribute = {
        ...this.attribute,
        value: value as number
      }
    } else if (isAttributeText(this.attribute)) {
      newEventAttribute = {
        ...this.attribute,
        value: value as string
      }
    } else {
      throw new Error('Unrecognized attribute type');
    }

    this.store.editEventAttribute(this.funnelStepId, this.attribute.id, newEventAttribute);
  }

  deleteEventAttribute(): void {
    this.store.deleteEventAttribute(this.funnelStepId, this.attribute.id);
  }
}
