import { apiClient } from './api';
import type { Vacancy, CreateVacancyDto, UpdateVacancyDto, PaginatedResponse } from '../types';

export interface VacancyFilters {
  search?: string;
  estado?: string;
  page?: number;
  pageSize?: number;
}

export const vacancyService = {
  getAll: async (filters: VacancyFilters = {}): Promise<PaginatedResponse<Vacancy>> => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.estado) params.set('estado', filters.estado);
    if (filters.page) params.set('_page', String(filters.page));
    if (filters.pageSize) params.set('_limit', String(filters.pageSize));

    const response = await apiClient.get<Vacancy[]>(`/vacancies?${params}`);
    const total = parseInt(response.headers['x-total-count'] || '0', 10);

    return {
      data: response.data,
      total,
      page: filters.page || 1,
      pageSize: filters.pageSize || 10,
      totalPages: Math.ceil(total / (filters.pageSize || 10)),
    };
  },

  getById: async (id: number): Promise<Vacancy> => {
    const response = await apiClient.get<Vacancy>(`/vacancies/${id}`);
    return response.data;
  },

  create: async (data: CreateVacancyDto): Promise<Vacancy> => {
    const response = await apiClient.post<Vacancy>('/vacancies', data);
    return response.data;
  },

  update: async (id: number, data: UpdateVacancyDto): Promise<Vacancy> => {
    const response = await apiClient.patch<Vacancy>(`/vacancies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/vacancies/${id}`);
  },
};