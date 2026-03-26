# 📚 StudyOrg — Documentação de Arquitetura Angular

> Organizador de Tarefas de Estudo · Angular 18+ · Feature-Based · Standalone Components · Angular Signals

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Descrição das Camadas](#3-descrição-das-camadas)
4. [Path Aliases](#4-path-aliases)
5. [Convenções de Nomenclatura](#5-convenções-de-nomenclatura)
6. [Regras de Dependência](#6-regras-de-dependência)
7. [Tecnologias e Padrões Adotados](#7-tecnologias-e-padrões-adotados)
8. [Guia de Início Rápido](#8-guia-de-início-rápido)
9. [Próximos Passos Sugeridos](#9-próximos-passos-sugeridos)

---

## 1. Visão Geral

O **StudyOrg** é um organizador de tarefas de estudo construído com **Angular 18+**. O projeto adota uma arquitetura **Feature-Based** com Standalone Components e Angular Signals, priorizando modularidade, escalabilidade e ausência de boilerplate desnecessário.

### Funcionalidades Principais

- Cadastro de tarefas de estudo com título, descrição e prioridade
- Definição de prazos com validação de data
- Marcar tarefas como concluídas (toggle reativo via Signals)
- Visualização de tarefas pendentes com filtro computado
- Painel de estatísticas (total, pendentes, concluídas)

### Por que Feature-Based?

O modelo **Feature-Based** foi escolhido em detrimento do Layer-Based pelos seguintes motivos:

| Vantagem | Detalhe |
|---|---|
| Isolamento de domínio | Cada feature (`tasks`, `dashboard`) é autocontida e pode ser desenvolvida independentemente |
| Lazy loading natural | Cada rota carrega somente o código da sua feature sob demanda |
| Escalabilidade de time | Squads distintos podem trabalhar em features sem conflito de arquivos |
| Menor acoplamento | Domínios de negócio diferentes não se conhecem diretamente |
| Tree-shaking | Bundles menores em produção — código não usado não é carregado |

---

## 2. Estrutura de Pastas

```
src/
├── main.ts                                   # Bootstrap da aplicação
└── app/
    ├── app.component.ts                      # Componente raiz (navbar + router-outlet)
    ├── app.config.ts                         # Providers globais (router, http, etc.)
    ├── app.routes.ts                         # Rotas raiz com lazy loading
    │
    ├── core/                                 # Singleton — instanciado uma única vez
    │   ├── models/
    │   │   └── task.model.ts                 # Interface Task e tipo TaskPriority
    │   ├── services/
    │   │   └── task.service.ts               # CRUD de tarefas com Angular Signals
    │   ├── guards/
    │   │   └── .gitkeep
    │   └── interceptors/
    │       └── .gitkeep
    │
    ├── shared/                               # Reutilizável em qualquer feature
    │   ├── components/
    │   │   └── task-card.component.ts        # Card de tarefa genérico
    │   ├── pipes/
    │   │   └── .gitkeep
    │   ├── directives/
    │   │   └── .gitkeep
    │   └── utils/
    │       └── date.utils.ts                 # Funções puras de data
    │
    └── features/                             # Domínios de negócio isolados
        ├── tasks/
        │   ├── pages/
        │   │   ├── task-list.page.ts         # Listagem de tarefas
        │   │   └── task-form.page.ts         # Formulário de nova tarefa
        │   ├── store/
        │   │   └── task.store.ts             # Estado local com Angular Signals
        │   └── components/
        │       └── .gitkeep
        └── dashboard/
            └── pages/
                └── dashboard.page.ts         # Painel com estatísticas
```

---

## 3. Descrição das Camadas

### `core/` — Núcleo da Aplicação

Contém tudo que é instanciado **uma única vez** na aplicação. Nenhuma lógica específica de feature deve residir aqui — apenas serviços globais, modelos de domínio e infraestrutura transversal.

| Pasta | Responsabilidade | Exemplos |
|---|---|---|
| `models/` | Interfaces e tipos TypeScript do domínio | `Task`, `TaskPriority` |
| `services/` | Serviços de negócio com `providedIn: 'root'` | `TaskService` |
| `guards/` | Route guards para controle de acesso | `AuthGuard`, `RoleGuard` |
| `interceptors/` | Interceptors HTTP para headers e tratamento de erros | `AuthInterceptor` |

**Exemplo — `task.model.ts`:**

```typescript
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  tags?: string[];
}
```

**Exemplo — `task.service.ts`:**

```typescript
@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks = signal<Task[]>([]);

  readonly tasks = this._tasks.asReadonly();

  add(task: Omit<Task, 'id' | 'createdAt'>): void {
    this._tasks.update(list => [
      ...list,
      { ...task, id: crypto.randomUUID(), createdAt: new Date() },
    ]);
  }

  toggleComplete(id: string): void {
    this._tasks.update(list =>
      list.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  remove(id: string): void {
    this._tasks.update(list => list.filter(t => t.id !== id));
  }
}
```

---

### `shared/` — Recursos Reutilizáveis

Contém recursos usados por **qualquer feature**. Os componentes aqui não conhecem nenhuma feature específica — comunicam-se apenas via `@Input` e `@Output`.

| Pasta | Responsabilidade | Exemplos |
|---|---|---|
| `components/` | Standalone components genéricos sem lógica de negócio | `TaskCardComponent`, `ButtonComponent` |
| `pipes/` | Pipes puros e reutilizáveis | `TruncatePipe`, `FormatDatePipe` |
| `directives/` | Diretivas de comportamento | `TooltipDirective`, `AutofocusDirective` |
| `utils/` | Funções puras sem efeitos colaterais | `date.utils.ts`, `string.utils.ts` |

**Exemplo — `task-card.component.ts`:**

```typescript
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `...`,
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
```

**Exemplo — `date.utils.ts`:**

```typescript
/** Retorna true se a data já passou. */
export function isOverdue(date: Date): boolean {
  return new Date(date) < new Date();
}

/** Formata data no padrão pt-BR. */
export function formatDateBR(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

/** Retorna o número de dias restantes até o prazo. */
export function daysUntil(date: Date): number {
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
```

---

### `features/` — Domínios de Negócio

Cada subpasta em `features/` representa um domínio independente. Features **não devem importar entre si** — a comunicação ocorre via services do `core/` ou store compartilhado.

| Pasta | Responsabilidade | Exemplos |
|---|---|---|
| `tasks/pages/` | Componentes-rota carregados via lazy loading | `TaskListPage`, `TaskFormPage` |
| `tasks/store/` | Estado local reativo com Angular Signals | `TaskStore` |
| `tasks/components/` | Componentes exclusivos da feature tasks | `TaskFiltersComponent` |
| `dashboard/pages/` | Páginas do painel de controle | `DashboardPage` |

**Exemplo — `task.store.ts`:**

```typescript
@Injectable({ providedIn: 'root' })
export class TaskStore {
  private _tasks = signal<Task[]>([]);

  // Selectors
  readonly all     = this._tasks.asReadonly();
  readonly pending = computed(() => this._tasks().filter(t => !t.completed));
  readonly done    = computed(() => this._tasks().filter(t => t.completed));
  readonly total   = computed(() => this._tasks().length);

  // Mutations
  setAll(tasks: Task[]): void   { this._tasks.set(tasks); }
  add(task: Task): void         { this._tasks.update(l => [...l, task]); }
  remove(id: string): void      { this._tasks.update(l => l.filter(t => t.id !== id)); }
  toggle(id: string): void {
    this._tasks.update(l =>
      l.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
}
```

**Exemplo — `task-list.page.ts`:**

```typescript
@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskCardComponent],
  template: `...`,
})
export class TaskListPage {
  protected taskService = inject(TaskService);
}
```

---

## 4. Path Aliases

Os aliases são configurados em `tsconfig.json` e eliminam imports relativos longos e frágeis. O Angular CLI e as IDEs reconhecem automaticamente.

### Configuração no `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*":          ["*"],
      "@core/*":      ["app/core/*"],
      "@shared/*":    ["app/shared/*"],
      "@features/*":  ["app/features/*"],
      "@assets/*":    ["assets/*"]
    }
  }
}
```

### Tabela de Aliases

| Alias | Aponta para | Exemplo de uso |
|---|---|---|
| `@/*` | `src/*` | `import { env } from '@/environments/env'` |
| `@core/*` | `src/app/core/*` | `import { Task } from '@core/models/task.model'` |
| `@shared/*` | `src/app/shared/*` | `import { TaskCardComponent } from '@shared/components/task-card.component'` |
| `@features/*` | `src/app/features/*` | `import { TaskStore } from '@features/tasks/store/task.store'` |
| `@assets/*` | `src/assets/*` | `import logo from '@assets/images/logo.svg'` |

### Antes e Depois

```typescript
// ❌ Sem alias — frágil e difícil de manter
import { Task } from '../../../core/models/task.model';
import { TaskCardComponent } from '../../shared/components/task-card.component';

// ✅ Com alias — limpo e refactor-safe
import { Task } from '@core/models/task.model';
import { TaskCardComponent } from '@shared/components/task-card.component';
```

---

## 5. Convenções de Nomenclatura

O projeto segue as convenções oficiais do **Angular Style Guide**.

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componente | `PascalCase` + sufixo `Component` | `TaskCardComponent` |
| Página (rota) | `PascalCase` + sufixo `Page` | `TaskListPage` |
| Serviço | `PascalCase` + sufixo `Service` | `TaskService` |
| Store | `PascalCase` + sufixo `Store` | `TaskStore` |
| Interface / Model | `PascalCase`, sem sufixo | `Task`, `TaskPriority` |
| Enum | `PascalCase` | `TaskStatus` |
| Arquivo | `kebab-case` + `.tipo.ts` | `task-card.component.ts` |
| Utilitário | `kebab-case` + `.utils.ts` | `date.utils.ts` |
| Seletor HTML | `app-` + `kebab-case` | `<app-task-card>` |
| Rota / URL | `kebab-case` | `/tasks/new` |
| Variável / prop | `camelCase` | `dueDate`, `isPending` |
| Constante global | `UPPER_SNAKE_CASE` | `MAX_TASKS_PER_PAGE` |

---

## 6. Regras de Dependência

```
features  →  pode importar de  →  shared  e  core
shared    →  pode importar de  →  core
core      →  não depende de nada interno
features  →  NÃO devem importar diretamente de outras features
```

> **Comunicação entre features** deve ocorrer via services do `core/` ou store global.

### ✅ Permitido

```typescript
// Em task-list.page.ts (feature)
import { TaskService }     from '@core/services/task.service';      // ✅ feature → core
import { TaskCardComponent } from '@shared/components/task-card.component'; // ✅ feature → shared
import { TaskStore }       from '@features/tasks/store/task.store'; // ✅ dentro da mesma feature
```

### ❌ Proibido

```typescript
// Em dashboard.page.ts (feature dashboard)
import { TaskFormPage } from '@features/tasks/pages/task-form.page'; // ❌ feature → outra feature
```

### Outras regras

- Não usar `NgModules` — o projeto usa 100% Standalone Components
- Não colocar lógica de negócio em componentes de `shared/`
- Não injetar services de features dentro do `core/`

---

## 7. Tecnologias e Padrões Adotados

| Tecnologia | Versão | Motivo |
|---|---|---|
| Angular | `^18.0.0` | Standalone API estável, Signals nativos, View Transitions |
| Angular Signals | nativo | Reatividade sem RxJS boilerplate para estado local |
| Standalone Components | nativo | Sem NgModules, tree-shaking otimizado, lazy loading simples |
| Reactive Forms | nativo | Formulário de nova tarefa com validação tipada |
| TypeScript | `~5.4.0` | `strict: true`, `noImplicitReturns`, `noFallthroughCasesInSwitch` |
| Zone.js | `~0.14.0` | Change detection — pode ser removido ao migrar para Zoneless |
| RxJS | `~7.8.0` | Disponível para casos que exijam streams assíncronos |

### Configuração do `app.config.ts`

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch()),
  ],
};
```

### Configuração de rotas com lazy loading

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@features/dashboard/pages/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('@features/tasks/pages/task-list.page').then(m => m.TaskListPage),
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('@features/tasks/pages/task-form.page').then(m => m.TaskFormPage),
  },
];
```

---

## 8. Guia de Início Rápido

### Pré-requisitos

- Node.js 20+ e npm 10+
- Angular CLI 18+

```bash
npm install -g @angular/cli
```

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Servidor de desenvolvimento
npm start
# Acesse: http://localhost:4200

# 3. Build de produção
npm run build

# 4. Executar testes
npm test
```

### Criar novos artefatos via CLI

```bash
# Componente standalone numa feature
ng g c features/tasks/components/task-badge --standalone

# Serviço no core
ng g s core/services/notification

# Guard no core
ng g guard core/guards/auth

# Pipe em shared
ng g pipe shared/pipes/truncate --standalone
```

---

## 9. Próximos Passos Sugeridos

- Adicionar **`@ngrx/signals`** para estado global mais complexo entre features
- Implementar persistência com **localStorage** via service no `core/`
- Adicionar feature **`categories/`** para agrupar tarefas por matéria
- Configurar **ESLint + Prettier** com regras de `import/order`
- Adicionar testes unitários com **Jasmine/Karma** para services e stores
- Migrar para **Zoneless Change Detection** (experimental no Angular 18)
- Configurar **PWA** com `@angular/pwa` para uso offline
- Adicionar **i18n** com `@angular/localize` para suporte a múltiplos idiomas

---

*Documentação gerada em março de 2026 · StudyOrg v1.0 · Angular 18+*