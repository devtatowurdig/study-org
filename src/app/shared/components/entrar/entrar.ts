import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  constructor(private readonly router: Router) {}

  emailIcon = faEnvelope;
  arrowIcon = faArrowRight;
  lockIcon: IconDefinition = faLock;

  onSubmit(event: Event): void {
    event.preventDefault();
    void this.router.navigate(['/dashboard']);
  }
}
