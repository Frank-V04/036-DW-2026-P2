import { z } from 'zod';

export const vacancySchema = z.object({
  puesto: z
    .string({ error: 'El puesto es requerido' })
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),

  departamento: z
    .string({ error: 'El departamento es requerido' })
    .min(2, 'Mínimo 2 caracteres'),

  modalidad: z.enum(['presencial', 'remoto', 'hibrido'], {
    error: 'Selecciona una modalidad',
  }),

  salarioOfrecido: z.coerce
    .number({ error: 'El salario es requerido' })
    .min(1, 'El salario debe ser mayor a 0')
    .max(999999, 'Salario fuera de rango'),

  fechaPublicacion: z
    .string({ error: 'La fecha de publicación es requerida' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (YYYY-MM-DD)'),

  estado: z.enum(['abierta', 'cerrada']).default('abierta'),

  candidatosPostulados: z.coerce
    .number()
    .min(0, 'No puede ser negativo')
    .default(0),
});

export type VacancyFormData = z.infer<typeof vacancySchema>;
export type VacancyFormInput = z.input<typeof vacancySchema>;