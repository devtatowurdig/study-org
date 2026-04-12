import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faClock,
  faLink,
  faPaperclip,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';

interface Attachment {
  id: number;
  name: string;
  size: string;
}

interface HistoryEvent {
  id: number;
  date: string;
  title: string;
}

@Component({
  selector: 'app-tasks',
  imports: [AppLayout, FontAwesomeModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tasks {
  readonly search = signal('');

  readonly attachments = signal<Attachment[]>([
    { id: 1, name: 'Lista_Exercicios_C3.pdf', size: '2.4 MB' },
    { id: 2, name: 'Formulas_Calculo_III.pdf', size: '850 KB' },
    { id: 3, name: 'Anotacoes_Aula_12.png', size: '5.1 MB' },
    { id: 4, name: 'Material_Referencia.zip', size: '12 MB' },
  ]);

  readonly history = signal<HistoryEvent[]>([
    { id: 1, date: 'Hoje, 09:30', title: 'Voce atualizou as notas pessoais' },
    { id: 2, date: 'Ontem, 19:15', title: 'Anexo: Anotacoes_Aula_12' },
    { id: 3, date: '15 Out, 2024', title: 'Tarefa movida para Em Andamento' },
    { id: 4, date: '13 Out, 2024', title: 'Tarefa criada por voce' },
  ]);

  readonly paperclipIcon = faPaperclip;
  readonly clockIcon = faClock;
  readonly calendarIcon = faCalendarDays;
  readonly editIcon = faPencil;
  readonly deleteIcon = faTrashCan;
  readonly linkIcon = faLink;

  updateSearch(value: string): void {
    this.search.set(value);
  }
}
