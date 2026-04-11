import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'study-org-theme';

  readonly mode = signal<ThemeMode>('light');
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(mode: ThemeMode): void {
    this.mode.set(mode);
    this.applyTheme(mode);

    try {
      localStorage.setItem(this.storageKey, mode);
    } catch {
      // Ignore storage errors to keep theme switching functional.
    }
  }

  private initializeTheme(): void {
    let initialMode: ThemeMode = 'light';

    try {
      const savedMode = localStorage.getItem(this.storageKey);
      if (savedMode === 'dark' || savedMode === 'light') {
        initialMode = savedMode;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialMode = 'dark';
      }
    } catch {
      // Keep default mode when storage/media query are unavailable.
    }

    this.mode.set(initialMode);
    this.applyTheme(initialMode);
  }

  private applyTheme(mode: ThemeMode): void {
    const html = this.document.documentElement;
    html.classList.toggle('dark', mode === 'dark');
    html.style.colorScheme = mode;
  }
}