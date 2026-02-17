import { CreateClinicalHistoryDTO } from '@/application/dto/clinical-history/CreateClinicalHistoryDTO';
import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOPresentation } from '@/presentation/types';

// Create Patient Clinical History
export async function createPatientClinicalHistory(payload: CreateClinicalHistoryDTO) {
  const response = await fetch('/api/clinical-history/create-clinical-history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al crear el historial clínico');
  }

  return data;
}

// Weight Clinical History Response Interface
export interface WeightClinicalHistoryResponse {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOPresentation[];
  createdAt: string;
  updatedAt: string;
}

// Get Patient Clinical History
export async function getWeightClinicalHistory(
  patientId: string
): Promise<WeightClinicalHistoryResponse | null> {
  const response = await fetch(`/api/clinical-history/weight/${patientId}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al obtener el historial clínico');
  }

  return response.json();
}
