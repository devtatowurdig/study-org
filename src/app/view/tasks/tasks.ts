import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faCircleInfo,
  faPlus,
  faTags,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AppLayout } from '../../shared/components/layout/app-layout/app-layout';

type Priority = 'baixa' | 'media' | 'alta';

interface PriorityOption {
  value: Priority;
  label: string;
}

@Component({
  selector: 'app-tasks',
  imports: [AppLayout, FontAwesomeModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tasks {
  private readonly formBuilder = inject(FormBuilder);

  readonly search = signal('');

  readonly priorities: PriorityOption[] = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'media', label: 'Media' },
    { value: 'alta', label: 'Alta' },
  ];

  readonly recurrenceOptions = ['Nenhuma', 'Diaria', 'Semanal', 'Mensal'];

  readonly selectedTags = signal<string[]>(['Provas', 'Urgente']);
  readonly saveMessage = signal('');

  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    course: ['', [Validators.required, Validators.minLength(2)]],
    priority: ['media' as Priority, [Validators.required]],
    dueDate: ['2026-04-25', [Validators.required]],
    dueTime: ['14:00', [Validators.required]],
    estimatedHours: ['2.5', [Validators.pattern(/^\d+([.,]\d+)?$/)]],
    recurrence: ['Nenhuma', [Validators.required]],
    newTag: [''],
  });

  readonly canSubmit = computed(() => this.taskForm.valid && this.selectedTags().length > 0);

  readonly infoIcon = faCircleInfo;
  readonly tagsIcon = faTags;
  readonly calendarIcon = faCalendarDays;
  readonly plusIcon = faPlus;
  readonly removeIcon = faXmark;

  updateSearch(value: string): void {
    this.search.set(value);
  }

  selectPriority(priority: Priority): void {
    this.taskForm.controls.priority.setValue(priority);
  }

  addTag(): void {
    const rawValue = this.taskForm.controls.newTag.value;
    const nextTag = rawValue.trim();

    if (!nextTag) {
      return;
    }

    const exists = this.selectedTags().some((tag) => tag.toLowerCase() === nextTag.toLowerCase());
    if (exists) {
      this.taskForm.controls.newTag.setValue('');
      return;
    }

    this.selectedTags.update((current) => [...current, nextTag]);
    this.taskForm.controls.newTag.setValue('');
  }

  removeTag(tagToRemove: string): void {
    this.selectedTags.update((current) => current.filter((tag) => tag !== tagToRemove));
  }

  saveTask(): void {
    if (!this.canSubmit()) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task = this.taskForm.getRawValue();
    this.saveMessage.set(`Tarefa \"${task.title}\" pronta para criacao.`);
  }
}
