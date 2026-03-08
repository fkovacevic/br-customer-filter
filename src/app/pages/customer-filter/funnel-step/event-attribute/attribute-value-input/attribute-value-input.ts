import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../../../../../components/input/input';
import { EventAttributeString, EventAttributeNumber, EventAttributeRange, isAttributeRange, isAttributeNumber, isAttributeText } from '../../../../../models/formModels/funnelStep.formModel';

@Component({
  selector: 'app-attribute-value-input',
  imports: [InputComponent],
  templateUrl: './attribute-value-input.html',
  styleUrl: './attribute-value-input.scss',
})
export class AttributeValueInputComponent {
  @Input() attribute!: EventAttributeString | EventAttributeNumber | EventAttributeRange;
  @Output() onValueChange = new EventEmitter<string | number | [number, number]>();

  isRangeAttribute = isAttributeRange;
  isNumberAttribute = isAttributeNumber;
  isTextAttribute = isAttributeText;

  onRangeFromChange(value: string): void {
    this.onValueChange.emit([+value, (this.attribute as EventAttributeRange).value[1]]);
  }
  onRangeToChange(value: string): void {
    this.onValueChange.emit([(this.attribute as EventAttributeRange).value[0], +value]);
  }
  onNumberChange(value: string): void {
    this.onValueChange.emit(+value);
  }
  onTextChange(value: string): void {
    this.onValueChange.emit(value);
  }
}
