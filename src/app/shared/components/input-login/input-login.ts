import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-input-login',
  imports: [FontAwesomeModule],
  templateUrl: './input-login.html',
  styleUrl: './input-login.css',
})
export class InputLogin {
  @Input() icon!: IconDefinition;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() id: string = 'input';
}
