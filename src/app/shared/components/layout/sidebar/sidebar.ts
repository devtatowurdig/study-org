import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faCalendarDays,
  faCircleCheck,
  faCirclePlus,
  faCog,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly dashboardIcon = faTableColumns;
  readonly createTaskIcon = faCirclePlus;
  readonly calendarIcon = faCalendarDays;
  readonly completedIcon = faCircleCheck;
  readonly settingsIcon = faCog;
  readonly logoutIcon = faArrowRightFromBracket;
}
