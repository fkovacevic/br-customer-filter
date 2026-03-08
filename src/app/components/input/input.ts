import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrl: './input.scss'
})
export class InputComponent {
  @Input() value: string | number = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder: string = '';
  @Output() onValueChange = new EventEmitter<string>();
}
