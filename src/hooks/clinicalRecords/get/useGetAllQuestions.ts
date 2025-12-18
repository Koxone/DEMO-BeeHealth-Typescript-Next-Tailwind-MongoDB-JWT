import { useQuery } from '@tanstack/react-query';

/* Types */
export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  _id: string;
  questionId: number;
  text: string;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full' | 'quick';
  isMetric: boolean;
  type: string;
  options?: QuestionOption[];
  createdAt: string;
  updatedAt: string;
  category: string;
}

export function useGetAllQuestions() {
  /* Fetcher */
  const fetchQuestions = async (): Promise<Question[]> => {
    // Fetch request
    const res = await fetch('/api/clinicalRecords/questions');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch questions');
    }

    // Sort questions by questionId
    return [...data.data].sort((a, b) => a.questionId - b.questionId);
  };

  /* Query */
  const query = useQuery({
    queryKey: ['clinical-records-questions'],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  return {
    questions: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}

// Usage Example:
// const { questions, loading, error, refetch } = useGetAllQuestions();
