import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';

interface DayTask {
  id: number;
  title: string;
  subject: string;
  time: string;
}

@Component({
  selector: 'app-calendar',
  imports: [AppLayout, FontAwesomeModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar {
  readonly search = signal('');

  readonly days = [
    ['25', '26', '27', '28', '29', '1', '2'],
    ['3', '4', '5', '6', '7', '8', '9'],
    ['10', '11', '12', '13', '14', '15', '16'],
    ['17', '18', '19', '20', '21', '22', '23'],
    ['24', '25', '26', '27', '28', '29', '30'],
    ['31', '1', '2', '3', '4', '5', '6'],
  ];

  readonly agenda = signal<DayTask[]>([
    { id: 1, title: 'Entrega Projeto Engenharia', subject: 'Calculo IV', time: '23:59' },
    { id: 2, title: 'Leitura Capitulo 4', subject: 'Historia da Arte', time: '14:00' },
  ]);

  readonly plusIcon = faPlus;
  readonly filterIcon = faFilter;

  updateSearch(value: string): void {
    this.search.set(value);
  }
}
