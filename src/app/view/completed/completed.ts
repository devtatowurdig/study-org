import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBroom, faCalendarDays, faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';

type Priority = 'Alta' | 'Media' | 'Baixa';

interface CompletedTask {
  id: number;
  title: string;
  course: string;
  date: string;
  duration: string;
  priority: Priority;
}

@Component({
  selector: 'app-completed',
  imports: [AppLayout, FontAwesomeModule],
  templateUrl: './completed.html',
  styleUrl: './completed.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Completed {
  readonly search = signal('');

  readonly tasks = signal<CompletedTask[]>([
    { id: 1, title: 'Resumo de Calculo III - Integrais Triplas', course: 'Matematica', date: '12 Out, 2023', duration: '2h 30m', priority: 'Alta' },
    { id: 2, title: 'Leitura Capitulo 4: Estruturas de Dados', course: 'Programacao', date: '10 Out, 2023', duration: '1h 15m', priority: 'Media' },
    { id: 3, title: 'Exercicios de Termodinamica', course: 'Fisica', date: '08 Out, 2023', duration: '3h 45m', priority: 'Alta' },
    { id: 4, title: 'Redacao: Impactos da IA na Educacao', course: 'Portugues', date: '05 Out, 2023', duration: '2h 00m', priority: 'Media' },
    { id: 5, title: 'Projeto Final - Design de Interface', course: 'Design', date: '02 Out, 2023', duration: '5h 10m', priority: 'Baixa' },
    { id: 6, title: 'Estudo dirigido: Historia do Brasil Colonial', course: 'Historia', date: '28 Set, 2023', duration: '1h 30m', priority: 'Baixa' },
  ]);

  readonly filteredTasks = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.tasks();
    }

    return this.tasks().filter((task) => {
      return task.title.toLowerCase().includes(term) || task.course.toLowerCase().includes(term);
    });
  });

  readonly downloadIcon = faDownload;
  readonly broomIcon = faBroom;
  readonly filterIcon = faFilter;
  readonly calendarIcon = faCalendarDays;

  updateSearch(value: string): void {
    this.search.set(value);
  }

  priorityClass(priority: Priority): string {
    if (priority === 'Alta') {
      return 'bg-red-100 text-red-600';
    }
    if (priority === 'Media') {
      return 'bg-neutral-200 text-neutral-700';
    }
    return 'bg-emerald-100 text-emerald-700';
  }
}
