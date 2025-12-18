import { useCallback, useEffect, useState } from 'react';

type ConsultViewConfig = {
  selectedQuestions: number[];
  questionsOrder: number[];
};

export function useConsultViewConfig() {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [questionsOrder, setQuestionsOrder] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    // block: load
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/users/config/consult-view-config', {
          credentials: 'include',
        });

        if (response.status === 401) {
          setIsUnauthorized(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Error loading config');
        }

        const data = (await response.json()) as { consultViewConfig?: ConsultViewConfig };

        setSelectedQuestions(data?.consultViewConfig?.selectedQuestions || []);
        setQuestionsOrder(data?.consultViewConfig?.questionsOrder || []);
      } catch (error) {
        console.error('Error loading config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const saveConfig = useCallback(
    async (newSelectedQuestions: number[], newQuestionsOrder: number[]) => {
      if (isUnauthorized) return;

      setIsSaving(true);

      try {
        const response = await fetch('/api/users/config/consult-view-config', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            selectedQuestions: newSelectedQuestions,
            questionsOrder: newQuestionsOrder,
          }),
        });

        if (response.status === 401) {
          setIsUnauthorized(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Error saving config');
        }
      } catch (error) {
        console.error('Error saving config:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [isUnauthorized]
  );

  return {
    selectedQuestions,
    questionsOrder,
    setSelectedQuestions,
    setQuestionsOrder,
    saveConfig,
    isLoading,
    isSaving,
    isUnauthorized,
  };
}
