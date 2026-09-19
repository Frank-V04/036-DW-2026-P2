import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vacancyService, type VacancyFilters } from '../services/vacancyService';
import type { CreateVacancyDto, UpdateVacancyDto } from '../types';

export const vacancyKeys = {
  all: ['vacancies'] as const,
  list: (filters: VacancyFilters) => ['vacancies', 'list', filters] as const,
  detail: (id: number) => ['vacancies', id] as const,
};

export function useVacancies(filters: VacancyFilters = {}) {
  return useQuery({
    queryKey: vacancyKeys.list(filters),
    queryFn: () => vacancyService.getAll(filters),
  });
}

export function useCreateVacancy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateVacancyDto) => vacancyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vacancyKeys.all });
    },
  });
}

export function useUpdateVacancy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateVacancyDto }) =>
      vacancyService.update(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(vacancyKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: vacancyKeys.all });
    },
  });
}

export function useDeleteVacancy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => vacancyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vacancyKeys.all });
    },
  });
}