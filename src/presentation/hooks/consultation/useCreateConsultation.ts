import { ConsultationAnswerDTO } from '@/application/dto/consultation/GetConsultationResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateConsultation = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: ConsultationAnswerDTO[]) => {
      const response = await fetch('/api/consultation/create-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, answers }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Error al guardar la consulta');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patient-stats', patientId],
      });

      queryClient.invalidateQueries({
        queryKey: ['patient-history', patientId],
      });
      queryClient.invalidateQueries({
        queryKey: ['latest-consultation', patientId],
      });
    },
  });
};
