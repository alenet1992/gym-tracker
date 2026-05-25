# My Workout Plan

A simple and organized web application to view and track your workout plans.

## Features

### 📋 Plan Visualization
- **Plan 1**: Functional + Full Body (Circuit)
- **Plan 2**: Upper Body Strength (Progressive Load)
- **Plan 3**: Functional + Legs (Power and Endurance)
- **Plan 4**: Lower Body Strength (Progressive Load)

### 🏋️ Workout Management
- **View Details**: View all exercises for each plan
- **Start Workout**: Begin a workout with timer
- **Mark Exercises**: Mark exercises as completed during workout
- **Exercise Details**: Click on any exercise to see detailed instructions, tips and **demonstration videos/images**
- **Multimedia Content**: YouTube videos and images to demonstrate proper exercise execution
- **Visual Indicators**: Icons show which exercises have video 🎥 or image 📷 available

### 📊 History
- **Automatic Recording**: All workouts are saved automatically
- **Statistics**: View duration and completed exercises for each workout
- **Local Storage**: Data is stored in your browser

## How to Use

### 1. MongoDB

```bash
docker compose up -d
```

Copia `.env.example` para `.env` e ajusta `MONGODB_URI` se usares Atlas ou outra instância.

### 2. Instalar dependências

```bash
npm install
```

### 3. Desenvolvimento

Corre API (NestJS) e frontend (Vue/Vite) em paralelo:

```bash
npm run dev
```

- API: `http://localhost:3000`
- Frontend: `http://localhost:8000` (proxy de `/api` para o NestJS)

Na primeira execução, a API cria a coleção `workout_plans` e insere os 4 planos por defeito se estiver vazia.

Para atualizar planos existentes:

```bash
npm run seed:sync
```

### 4. Produção

```bash
npm run build
npm run start:prod
```

O NestJS serve a API e os ficheiros estáticos do frontend em `http://localhost:3000`.

### Endpoints

- `GET /api/health` — health check
- `GET /api/workout-plans` — lista todos os planos
- `GET /api/workout-plans/:id` — um plano por id

## Estrutura do projeto

```
├── client/          # Frontend Vue 3 + Vite
├── src/             # Backend NestJS
│   ├── database/
│   ├── workout-plans/
│   └── seed/
└── dist/
    ├── main.js      # API compilada
    └── client/      # Frontend compilado
```

## Technologies Used

- **NestJS**: API REST e servidor de produção
- **Vue 3 + Pinia + Vue Router**: Interface
- **MongoDB**: Planos de treino
- **Vite**: Build e dev server do frontend
- **LocalStorage**: Histórico de treinos no browser

---

**Happy workouts! 💪**
