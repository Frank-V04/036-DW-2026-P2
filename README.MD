Módulo de Vacantes — Mini RRHH

Descripción
Módulo de gestión de vacantes desarrollado sobre la base del proyecto Mini RRHH. Permite crear, editar, eliminar y filtrar vacantes de la empresa, siguiendo los mismos patrones del módulo de Empleados.

Tecnologías utilizadas
- React + TypeScript
- Vite
- TailwindCSS
- TanStack Query
- React Hook Form + Zod
- Zustand
- Axios
- JSON Server (mock API)

Instrucciones para instalar y ejecutar

1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

2. Instalar dependencias
npm install

3. Levantar la API mock (Terminal 1)
npx json-server db.json --port 3001

Levantar el frontend (Terminal 2)
npm run dev

La aplicación estará disponible en: `http://localhost:5173`

Funcionalidades del módulo de Vacantes
- Listado de vacantes en tarjetas (VacancyCard)
- Estadísticas: total, abiertas y cerradas
- Filtros por puesto y estado
- Crear vacante mediante modal con formulario validado
- Editar vacante existente (mismo modal en modo edición)
- Eliminar vacante con confirmación
- Ruta protegida `/vacantes` con ProtectedRoute
- Diseño responsivo mobile-first con TailwindCSS

Despliegue
Enlace: https://036-dw-2026-p2.vercel.app/
