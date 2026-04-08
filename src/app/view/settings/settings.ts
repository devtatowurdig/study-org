import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faShield } from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [AppLayout, FontAwesomeModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly themeService = inject(ThemeService);

  readonly search = signal('');
  readonly emailNotifications = signal(true);
  readonly pushNotifications = signal(false);
  readonly dailySummary = signal(true);

  readonly isDark = this.themeService.isDark;

  readonly infoIcon = faCircleInfo;
  readonly shieldIcon = faShield;

  updateSearch(value: string): void {
    this.search.set(value);
  }

  toggleEmail(): void {
    this.emailNotifications.update((value) => !value);
  }

  togglePush(): void {
    this.pushNotifications.update((value) => !value);
  }

  toggleSummary(): void {
    this.dailySummary.update((value) => !value);
  }

  setLightMode(): void {
    this.themeService.setTheme('light');
  }

  setDarkMode(): void {
    this.themeService.setTheme('dark');
  }
}
