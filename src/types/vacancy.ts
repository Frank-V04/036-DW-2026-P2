export type VacancyModality = "presencial" | "remoto" | "hibrido";
export type VacancyStatus = "abierta" | "cerrada";

export interface Vacancy {
  id: number;
  puesto: string;
  departamento: string;
  modalidad: VacancyModality;
  salarioOfrecido: number;
  fechaPublicacion: string; // ISO 8601: "2024-01-15"
  estado: VacancyStatus;
  candidatosPostulados: number;
}

export type CreateVacancyDto = Omit<Vacancy, "id">;
export type UpdateVacancyDto = Partial<CreateVacancyDto>;
