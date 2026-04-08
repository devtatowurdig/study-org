import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { InputLogin } from "../input-login/input-login";

@Component({
  selector: 'app-entrar',
  imports: [FontAwesomeModule, InputLogin, CommonModule],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css',
})
export class Entrar {
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  arrowIcon = faArrowRight;
  lockIcon: IconDefinition = faLock;
}
