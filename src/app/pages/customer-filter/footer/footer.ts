import { Component, EventEmitter, Output } from '@angular/core';
import { Button } from '../../../components/button/button';

@Component({
  selector: 'app-footer',
  imports: [Button],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Output() onApply = new EventEmitter<void>();
}
