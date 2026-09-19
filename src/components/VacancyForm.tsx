import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vacancySchema, type VacancyFormData, type VacancyFormInput } from '../schemas/vacancySchema';
import type { Vacancy } from '../types';

interface VacancyFormProps {
  vacancy?: Vacancy;
  onSubmit: (data: VacancyFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

function FormField({ label, error, children, required = false }: {
  label: string; error?: string; children: ReactNode; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
    </div>
  );
}

const inputClass = (hasError: boolean) => `
  w-full px-3 py-2 border rounded-lg text-sm transition-colors
  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
  ${hasError ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-slate-300 bg-white'}
`;

function VacancyForm({ vacancy, onSubmit, onCancel, isLoading = false, error }: VacancyFormProps) {
  const isEditing = !!vacancy;

  const { register, handleSubmit, reset, formState: { errors, isDirty } } =
    useForm<VacancyFormInput, unknown, VacancyFormData>({
      resolver: zodResolver(vacancySchema),
      defaultValues: {
        puesto: '',
        departamento: '',
        modalidad: 'presencial',
        salarioOfrecido: 0,
        fechaPublicacion: new Date().toISOString().split('T')[0],
        estado: 'abierta',
        candidatosPostulados: 0,
      },
    });

  useEffect(() => {
    if (vacancy) {
      reset({
        puesto: vacancy.puesto,
        departamento: vacancy.departamento,
        modalidad: vacancy.modalidad,
        salarioOfrecido: vacancy.salarioOfrecido,
        fechaPublicacion: vacancy.fechaPublicacion,
        estado: vacancy.estado,
        candidatosPostulados: vacancy.candidatosPostulados,
      });
    }
  }, [vacancy, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Puesto" error={errors.puesto?.message} required>
          <input {...register('puesto')} type="text" placeholder="Desarrollador Backend"
            className={inputClass(!!errors.puesto)} />
        </FormField>
        <FormField label="Departamento" error={errors.departamento?.message} required>
          <input {...register('departamento')} type="text" placeholder="Tecnología"
            className={inputClass(!!errors.departamento)} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Modalidad" error={errors.modalidad?.message} required>
          <select {...register('modalidad')} className={inputClass(!!errors.modalidad)}>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </FormField>
        <FormField label="Salario ofrecido (GTQ)" error={errors.salarioOfrecido?.message} required>
          <input {...register('salarioOfrecido')} type="number" min="0" step="100" placeholder="8500"
            className={inputClass(!!errors.salarioOfrecido)} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Fecha de publicación" error={errors.fechaPublicacion?.message} required>
          <input {...register('fechaPublicacion')} type="date"
            className={inputClass(!!errors.fechaPublicacion)} />
        </FormField>
        <FormField label="Estado" error={errors.estado?.message}>
          <select {...register('estado')} className={inputClass(!!errors.estado)}>
            <option value="abierta">Abierta</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </FormField>
      </div>

      <FormField label="Candidatos postulados" error={errors.candidatosPostulados?.message}>
        <input {...register('candidatosPostulados')} type="number" min="0" placeholder="0"
          className={inputClass(!!errors.candidatosPostulados)} />
      </FormField>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="button" onClick={onCancel} disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors disabled:opacity-50">
          Cancelar
        </button>
        <button type="submit" disabled={isLoading || (!isDirty && isEditing)}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-800 hover:bg-brand-700 rounded-lg transition-colors disabled:opacity-50 min-w-24">
          {isLoading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear vacante'}
        </button>
      </div>
    </form>
  );
}

export default VacancyForm;