import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { InputLogin } from "../input-login/input-login";



@Component({
  selector: 'app-registrar',
  imports: [FontAwesomeModule, InputLogin, CommonModule],
  templateUrl: './registrar.html',
  styleUrl: './registrar.css',
})
export class Registrar {
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  arrowIcon = faArrowRight;
  lockIcon: IconDefinition = faLock;
  nameIcon: IconDefinition = faUser;
}
