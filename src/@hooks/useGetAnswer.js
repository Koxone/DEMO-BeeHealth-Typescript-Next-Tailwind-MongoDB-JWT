'use client';

import { useMemo } from 'react';
import questions from '@/data/questions.json';

export default function useGetAnswer(record) {
  const questionMap = useMemo(() => {
    const map = {};
    for (const q of questions) map[q.id] = q;
    return map;
  }, []);

  const getAnswer = (questionId) => {
    if (!record || !record.answers) return 'Sin registro';

    // Find answer by questionId from DB record
    const answerObj = record.answers.find((a) => a?.question?.questionId === Number(questionId));

    if (!answerObj || answerObj.value == null || answerObj.value === '') {
      return 'Sin respuesta';
    }

    const rawAnswer = answerObj.value;

    const question = questionMap[questionId];

    if (question && question.options?.length > 0) {
      const match = question.options.find(
        (opt) => (typeof opt === 'object' ? opt.value : opt) === rawAnswer
      );
      if (match) return typeof match === 'object' ? match.label : match;
    }

    return rawAnswer;
  };

  return getAnswer;
}
