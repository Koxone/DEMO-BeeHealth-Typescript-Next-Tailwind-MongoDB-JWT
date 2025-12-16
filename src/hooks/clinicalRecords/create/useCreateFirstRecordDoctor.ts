'use client';

import { useState, useCallback } from 'react';

export function useCreateFirstRecordDoctor() {
  // Local states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [record, setRecord] = useState(null);

  // Submit function
  const submit = useCallback(async ({ patientId, specialty, answers }) => {
    setIsSubmitting(true);
    setError(null);
    setRecord(null);

    try {
      const payload = {
        patientId,
        specialty,
        version: 'full',
        answers,
      };

      console.log('Hook:', payload)

      const res = await fetch('/api/clinicalRecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const fail = await res.json();
        setError(fail?.error || 'Error');
        setIsSubmitting(false);
        return { ok: false, error: fail?.error || 'Error in useCreateFirstRecordDoctor' };
      }

      const data = await res.json();
      setRecord(data?.clinicalRecord || null);
      setIsSubmitting(false);

      return { ok: true, clinicalRecord: data?.clinicalRecord || null };
    } catch (err) {
      setError('Error');
      setIsSubmitting(false);
      return { ok: false, error: 'Error' };
    }
  }, []);

  return { submit, isSubmitting, error, record };
}
