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

## 📁 Estrutura de pastas

```
study-org/
└── src/
    └── app/
        ├── core/
        │   ├── models/        # Interfaces e tipos (Task, Category)
        │   ├── services/      # Lógica de negócio (task.service.ts)
        │   ├── guards/        # Guards de rota (expansão futura)
        │   └── interceptors/  # Interceptors HTTP
        ├── features/
        │   ├── tasks/         # Feature principal de tarefas
        │   │   ├── components/
        │   │   ├── pages/
        │   │   ├── tasks.routes.ts
        │   │   └── tasks.module.ts
        │   ├── dashboard/     # Visão geral e indicadores
        │   └── auth/          # Autenticação (expansão futura)
        └── shared/
            ├── components/    # Componentes reutilizáveis (Button, Modal…)
            └── pipes/         # Pipes customizados (DateFormat…)
```

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

