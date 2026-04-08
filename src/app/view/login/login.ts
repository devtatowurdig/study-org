import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../shared/components/logo/logo';
@Component({
  selector: 'app-login',
  imports: [Logo, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private readonly router: Router) {}

  logo = Logo;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  arrowIcon = faArrowRight;

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
