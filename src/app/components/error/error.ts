import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.html',
  styleUrl: './error.scss'
})
export class ErrorComponent {
  @Input() message: string = 'Something went wrong. Please try again.';
}
