import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faCalendarCheck,
  faChartLine,
  faCheck,
  faChevronRight,
  faClock,
  faFilter,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';

type Priority = 'alta' | 'media' | 'baixa';

interface StudyTask {
  id: number;
  title: string;
  category: string;
  deadline: string;
  priority: Priority;
  done: boolean;
}

interface FocusItem {
  id: number;
  title: string;
  subtitle: string;
  tone: 'amber' | 'cyan';
}

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, AppLayout],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly router = inject(Router);

  readonly userName = signal('Lucas');
  readonly search = signal('');

  readonly tasks = signal<StudyTask[]>([
    {
      id: 1,
      title: 'Revisao de Calculo II - Integrais Triplas',
      category: 'Engenharia',
      deadline: 'Hoje, 18:00',
      priority: 'alta',
      done: false,
    },
    {
      id: 2,
      title: 'Entrega do Prototipo de UI/UX',
      category: 'Design Digital',
      deadline: 'Amanha, 23:59',
      priority: 'alta',
      done: false,
    },
    {
      id: 3,
      title: 'Leitura Capitulo 4: Etica e Sociedade',
      category: 'Filosofia',
      deadline: '24 Out',
      priority: 'media',
      done: false,
    },
    {
      id: 4,
      title: 'Exercicios de Estrutura de Dados',
      category: 'Computacao',
      deadline: '25 Out',
      priority: 'media',
      done: true,
    },
    {
      id: 5,
      title: 'Preparacao para o Seminario de Marketing',
      category: 'Administracao',
      deadline: '26 Out',
      priority: 'baixa',
      done: false,
    },
  ]);

  readonly focusItems = signal<FocusItem[]>([
    {
      id: 1,
      title: 'Flashcards: Algoritmos',
      subtitle: 'Sessao de 15 min recomendada',
      tone: 'amber',
    },
    {
      id: 2,
      title: 'Leitura: IHC Moderno',
      subtitle: 'Meta: 10 paginas restantes',
      tone: 'cyan',
    },
  ]);

  readonly filteredTasks = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.tasks();
    }

    return this.tasks().filter((task) => {
      return (
        task.title.toLowerCase().includes(term) ||
        task.category.toLowerCase().includes(term) ||
        task.deadline.toLowerCase().includes(term)
      );
    });
  });

  readonly pendingTasks = computed(() => this.tasks().filter((task) => !task.done));
  readonly lateTasks = computed(() => this.tasks().filter((task) => task.priority === 'alta' && !task.done));

  readonly searchIcon = faMagnifyingGlass;
  readonly plusIcon = faPlus;
  readonly calendarIcon = faCalendarDays;
  readonly clockIcon = faClock;
  readonly deadlineIcon = faCalendarCheck;
  readonly chartIcon = faChartLine;
  readonly filterIcon = faFilter;
  readonly arrowIcon = faChevronRight;
  readonly checkIcon = faCheck;

  updateSearch(value: string): void {
    this.search.set(value ?? '');
  }

  openCreateTask(): void {
    void this.router.navigate(['/tasks']);
  }

  toggleTask(taskId: number): void {
    this.tasks.update((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              done: !task.done,
            }
          : task,
      ),
    );
  }

  priorityClass(priority: Priority): string {
    if (priority === 'alta') {
      return 'bg-red-500 text-white';
    }
    if (priority === 'media') {
      return 'bg-neutral-300 text-neutral-700';
    }
    return 'bg-emerald-200 text-emerald-800';
  }

  focusClass(tone: FocusItem['tone']): string {
    if (tone === 'amber') {
      return 'border-amber-100 bg-amber-50';
    }
    return 'border-cyan-100 bg-cyan-50';
  }
}