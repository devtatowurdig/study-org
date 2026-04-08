# 📚 study-org

Aplicação web para organização de atividades de estudo. Permite cadastrar tarefas, definir prazos, marcar itens como concluídos e acompanhar pendências de forma simples e visual.

---

## 🚀 Tecnologias

- [Angular](https://angular.io/) — framework principal
- [Tailwind CSS](https://tailwindcss.com/) — estilização utilitária
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Node.js](https://nodejs.org/) — ambiente de execução

---

## ✅ Funcionalidades

- Cadastro de tarefas de estudo
- Definição de prazos por tarefa
- Marcar tarefas como concluídas
- Visualização de tarefas pendentes

---

## 📁 Estrutura de Pastas

```
src/
└── app/
    ├── core/                     # Lógica de negócio (serviços e modelos)
    │   ├── services/
    │   │   ├── task.service.ts    # Gerenciamento de tarefas
    │   │   └── storage.service.ts # Persistência em localStorage
    │   └── models/
    │       └── task.model.ts     # Interface da tarefa
    │
    ├── shared/                   # Componentes e utilitários reutilizáveis
    │   ├── components/           # Componentes
    │   └── utils/                # Funções utilitárias
    │
    └── view/                     # Componentes de página/view

├── app.component.ts              # Componente raiz
├── app.routes.ts                 # Rotas principais
├── app.config.ts                 # Configuração da app
```

### 🎯 Responsabilidades

- **core/**: Serviços, models e lógica de negócio
- **shared/**: Componentes e utilities reutilizáveis entre views
- **view/**: Páginas/componentes de visualização principais

---

## ⚙️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [npm](https://www.npmjs.com/) versão 9 ou superior

Para verificar as versões instaladas:

```bash
node -v
npm -v
```

---

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/study-org.git

# Entre na pasta do projeto
cd study-org

# Instale as dependências
npm install
```

---

## ▶️ Como executar

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em: **http://localhost:4200**

O servidor recarrega automaticamente ao detectar alterações nos arquivos fonte.

