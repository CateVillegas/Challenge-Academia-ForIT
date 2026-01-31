# Challenge Academia ForIT – Task App

Este proyecto corresponde al challenge técnico de ingreso a la Academia ForIT. Consiste en una aplicación de gestión de tareas desarrollada con un backend en Node.js + Express y un frontend en React + TypeScript, comunicados mediante una API REST.

La aplicación permite crear, listar, editar y eliminar tareas, utilizando un array en memoria como almacenamiento temporal, cumpliendo con los requisitos solicitados en la consigna.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- JavaScript
- CORS
- dotenv
- nodemon

### Frontend
- React
- TypeScript
- Vite
- React Router
- Fetch API
- CSS puro

## Estructura del proyecto

El proyecto se organiza en dos carpetas principales: `backend` y `frontend`, separando claramente la lógica del servidor y la interfaz de usuario. A continuación se describe la estructura de cada una y el propósito de sus carpetas y archivos principales.

Backend (estructura y descripción):

```
backend/
  package.json                - Dependencias y scripts del servidor (Express, nodemon, etc.)
  src/
    app.js                    - Configuración de Express y middlewares
    server.js                 - Punto de entrada que levanta el servidor
    controllers/
      tasks.controller.js     - Controladores que manejan las rutas de tareas
    middlewares/
      errorHandler.js         - Manejo centralizado de errores
    routes/
      tasks.routes.js         - Definición de rutas de la API para tareas
    services/
      tasks.service.js        - Lógica de negocio y operaciones sobre tareas
    store/
      tasks.store.js          - Almacenamiento en memoria de las tareas
```

Frontend (estructura y descripción):

```
frontend/
  package.json                - Dependencias y scripts del cliente (Vite, React, TypeScript)
  vite.config.ts              - Configuración del bundler Vite
  tsconfig.json               - Configuración de TypeScript
  public/                     - Archivos estáticos servidos por Vite (favicon, imágenes públicas)
  src/
    main.tsx                  - Punto de entrada de la aplicación React
    index.css                 - Estilos globales
    App.tsx                   - Componente raíz de la aplicación
    App.css                   - Estilos del componente `App`
    layout/
      AppLayout.tsx           - Layout general con navegación y estructura de páginas
    pages/
      TaskList.tsx            - Página con la lista de tareas
      TaskForm.tsx            - Formulario para crear/editar tareas
      TaskItem.tsx            - Componente para mostrar una tarea individual
    services/
      tasksApi.ts             - Cliente para llamadas a la API del backend
    types/
      task.ts                 - Tipos/Interfaces de TypeScript para tareas
    assets/                    - Imágenes y recursos usados por la UI
```


## Ejecución local del proyecto

Para ejecutar la aplicación localmente es necesario tener Node.js instalado.

```bash
git clone <url-del-repositorio>
cd Challenge-Academia-ForIT

# Backend
cd backend
npm install
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

El backend queda disponible en http://localhost:3000  
El frontend queda disponible en http://localhost:5173  

### Variables de entorno

En la carpeta backend, crear un archivo `.env` con:
PORT=3000

En la carpeta frontend, crear un archivo `.env` con:
VITE_API_URL=http://localhost:3000

Se incluyen archivos de ejemplo de variables de entorno en el repositorio para facilitar la configuración:

- `backend/.env.example` — contiene las variables mínimas para el servidor (ej. `PORT`, `NODE_ENV`).
- `frontend/.env.example` — contiene `VITE_API_URL` apuntando al backend local.

Para usar los ejemplos, copiá cada archivo `.env.example` a `.env` en la misma carpeta y, si es necesario, ajustá los valores.

```bash
# desde la raíz del repo (bash)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Funcionalidades implementadas

- Crear tareas
- Listar tareas
- Editar tareas
- Eliminar tareas
- Visualizar el detalle de una tarea
- Manejo básico de estados de carga y error
- Navegación mediante rutas con React Router
- Estilos básicos con CSS

## API – Endpoints disponibles

- GET /api/tasks  
  Obtiene todas las tareas.

- POST /api/tasks  
  Crea una nueva tarea. Requiere el campo title.

- PUT /api/tasks/:id  
  Actualiza una tarea existente.

- DELETE /api/tasks/:id  
  Elimina una tarea por id.

## Capturas de pantalla

Se incluyen capturas de la aplicación funcionando correspondientes a:

- Pantalla principal con lista de tareas y estadísticas
- Formulario de creación de tareas
- Formulario de edición de tareas
- Vista de detalle de una tarea

Las imágenes se encuentran en la carpeta screenshots del repositorio.


