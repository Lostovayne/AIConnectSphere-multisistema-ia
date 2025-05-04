# Chat IA Personalizada

Este es un proyecto Next.js que sirve como plataforma para integrar y demostrar diversos sistemas y funcionalidades de Inteligencia Artificial (IA), ofreciendo una interfaz moderna y un diseño limpio.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15+ con App Router y Turbopack)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) (v4) con [Shadcn/UI](https://ui.shadcn.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Animaciones:** [tw-animate-css](https://github.com/your-repo/tw-animate-css) (si aplica, ajustar enlace)
- **Linting:** [ESLint](https://eslint.org/)
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/) (basado en `pnpm-lock.yaml`)

## Getting Started

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Prerrequisitos

- Node.js (v20+ recomendado)
- pnpm (o el gestor de paquetes que prefieras: npm, yarn)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd chat-ia-personalizada
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   # o
   # npm install
   # o
   # yarn install
   ```

### Ejecución (Modo Desarrollo)

Inicia el servidor de desarrollo (con Turbopack):

```bash
pnpm run dev
# o
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

La página se actualizará automáticamente a medida que edites los archivos.

### Build para Producción

```bash
pnpm run build
```

### Iniciar Servidor de Producción

```bash
pnpm run start
```

## Estructura del Proyecto

Una visión general de las carpetas clave:

- `app/`: Contiene las rutas principales de la aplicación (App Router).
- `components/`: Componentes reutilizables de la interfaz de usuario (basados en Shadcn/UI).
- `views/`: Componentes de página que implementan diferentes funcionalidades de IA, como asistentes, procesamiento de audio, revisión de código, métricas en tiempo real, etc.
- `lib/`: Utilidades y lógica compartida.
- `hooks/`: Hooks personalizados de React.
- `ai/`: Lógica relacionada con la integración de IA.
- `public/`: Archivos estáticos.
- `styles/`: Archivos de estilos globales (`globals.css`).

## Configuración

- **Tailwind CSS:** Configurado en `tailwind.config.js` y `postcss.config.mjs`.
- **TypeScript:** Configurado en `tsconfig.json`.
- **Next.js:** Configurado en `next.config.mjs` (incluye `assetPrefix` y configuración de imágenes remotas para Cloudinary).
- **Variables de Entorno:** Crea un archivo `.env.local` basado en `.env.example` para configurar variables específicas del entorno.

## Despliegue

La forma más sencilla de desplegar esta aplicación Next.js es utilizando la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), de los creadores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Features

1 **Que aprenda de mi codigo, integrar una bd de redis a la que consultar informacion , las respuestas se marcan con guardar y se agregan a redis como una base de codigo propia**
