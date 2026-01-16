'use client';

import { useMemo } from 'react';
import { Apple, Dumbbell, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import EditRecordDateButton from './components/EditRecordDateButton';
import SortableAnswerCard from './components/SortableAnswerCard';

// Drag and Drop Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

// Types
import { ConsultCardProps, Answer } from '@/@types/consults/consults.types';

// Local Helpers
import { getActionBadge } from './services/helpers';

// Custom Hooks
import { useEditClinicalRecord } from '@/@hooks/clinicalRecords/edit/useEditClinicalRecord';

export default function ConsultCard({
  r,
  onEdit,
  onOpen,
  onDelete,
  fetchRecord,
  patientRecord,
  patientId,
  events,
  selectedQuestions,
  questionsOrder,
  onOrderChange,
}: ConsultCardProps) {
  const { editClinicalRecord } = useEditClinicalRecord();

  const firstRecord = patientRecord?.find((record) => record.version === 'full');

  const recordId = r._id;

  const filteredDietsEvents = events?.filter(
    (event) => event.clinicalRecord === recordId && event.eventType.includes('diet')
  );

  const filteredWorkoutsEvents = events?.filter(
    (event) => event.clinicalRecord === recordId && event.eventType.includes('workout')
  );

  // Answers
  const mergedAnswers = useMemo(() => {
    const baseAnswers = firstRecord?.answers || [];
    const consultAnswers = r?.answers || [];

    const map = new Map<number, Answer>();

    // Base
    baseAnswers.forEach((answer) => {
      const id = answer?.questionId || answer?.question?.questionId;
      if (!id) return;
      map.set(id, answer);
    });

    // Consult override
    consultAnswers.forEach((answer) => {
      const id = answer?.questionId || answer?.question?.questionId;
      if (!id) return;
      map.set(id, answer);
    });

    return Array.from(map.values());
  }, [firstRecord, r]);

  // Filter
  const filteredAnswers = useMemo(() => {
    return mergedAnswers.filter((answer) => {
      if (!answer) return false;
      if (!answer.question) return false;
      if (!answer.question.text) return false;

      const questionId = answer.questionId || answer.question.questionId;
      if (!questionId) return false;

      if (!selectedQuestions.includes(questionId)) return false;

      if (!answer.value || answer.value.trim() === '') return false;

      if (answer.question.type === 'radio') {
        return answer.value === 'true';
      }

      if (answer.question.type === 'text' || answer.question.type === 'textarea') {
        const lowerValue = answer.value.toLowerCase();
        return lowerValue !== 'ninguna' && lowerValue !== 'ninguno';
      }

      return true;
    });
  }, [mergedAnswers, selectedQuestions]);

  // Order Answers
  const orderedAnswers = useMemo(() => {
    return [...filteredAnswers].sort((a, b) => {
      // IMPORTANT: Handle both cases where questionId might be directly on answer or inside answer.question
      const questionIdA = a.questionId || a.question.questionId;
      const questionIdB = b.questionId || b.question.questionId;

      const indexA = questionsOrder.indexOf(questionIdA);
      const indexB = questionsOrder.indexOf(questionIdB);

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }, [filteredAnswers, questionsOrder]);

  // Drag and Drop Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle Drag and Drop End
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const currentQuestionIds = orderedAnswers.map(
        (answer) => answer.questionId || answer.question.questionId
      );

      const oldIndex = currentQuestionIds.indexOf(active.id as number);
      const newIndex = currentQuestionIds.indexOf(over.id as number);

      if (oldIndex === -1 || newIndex === -1) {
        console.warn('Drag indices not found', { active: active.id, over: over.id });
        return;
      }

      const reorderedVisible = arrayMove(currentQuestionIds, oldIndex, newIndex);
      const questionsNotVisible = questionsOrder.filter((id) => !currentQuestionIds.includes(id));
      const newGlobalOrder = [...reorderedVisible, ...questionsNotVisible];

      onOrderChange(newGlobalOrder);
    }
  };

  // Get question IDs in order
  const questionIds = orderedAnswers.map(
    (answer) => answer.questionId || answer.question.questionId
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {/* Date block */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="border-beehealth-blue-primary-solid bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark flex h-12 w-12 flex-col items-center justify-center rounded-lg border sm:h-14 sm:w-14">
          <span className="text-xs font-medium uppercase">
            {new Date(`${r.recordDate.substring(0, 7)}-15T12:00:00Z`).toLocaleDateString('es-MX', {
              month: 'short',
            })}
          </span>
          <span className="text-base font-bold sm:text-lg">{r.recordDate.substring(8, 10)}</span>
        </div>

        {/* First record badge */}
        {r?.version === 'full' && (
          <span className="text-beehealth-blue-primary-solid text-xs font-semibold">
            Primera Vez
          </span>
        )}

        {/* Edit Date Button */}
        <EditRecordDateButton
          fetchRecord={fetchRecord}
          recordDate={r.recordDate}
          onSelect={(formattedDate) => {
            editClinicalRecord(r._id, { recordDate: formattedDate });
          }}
        />
      </div>

      {/* Info cards con Drag & Drop */}
      <div className="w-full">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={questionIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-4 grid-rows-2 items-center justify-center gap-2">
              {/* Respuestas ordenables */}
              {orderedAnswers.map((answer) => (
                <SortableAnswerCard
                  key={answer._id}
                  answer={answer}
                  category={answer.question.category}
                />
              ))}

              {/* Diets on this consult */}
              {filteredDietsEvents?.map((event, index) => {
                const badge = getActionBadge(event?.eventType);
                const BadgeIcon = badge.icon;

                return (
                  <Link
                    key={`diet-${index}`}
                    href={`/doctor/diets/${event?.diet?._id}` || '#'}
                    className={`${badge.className} h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                        <span className="truncate text-white underline">{badge?.label}</span>
                      </div>
                      <BadgeIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {event?.diet?.name || 'Ninguna'}
                    </p>
                  </Link>
                );
              })}

              {/* Workouts on this consult */}
              {filteredWorkoutsEvents?.map((event, index) => {
                const badge = getActionBadge(event?.eventType);
                const BadgeIcon = badge.icon;

                return (
                  <Link
                    key={`workout-${index}`}
                    href="/doctor/workouts/"
                    className={`${badge.className} h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                        <span className="truncate text-white underline">{badge?.label}</span>
                      </div>
                      <BadgeIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {event?.snapshot?.workoutName || 'Ninguna'}
                    </p>
                  </Link>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onOpen(r, true)}
          className="bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover self-start rounded-lg p-2 text-white hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="flex flex-col justify-between gap-2">
          {/* Add Diets Button */}
          {r?.version === 'short' && (
            <Link
              href={`/doctor/patients/${patientId}?tab=Dietas&recordId=${recordId}`}
              title="Agregar Dieta a esta consulta"
              className="bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark-hover flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Plus className="h-4 w-4" />
              <Apple className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          )}

          {/* Add Workouts Button */}
          {r?.version === 'short' && (
            <Link
              href={`/doctor/patients/${patientId}?tab=Ejercicios&recordId=${recordId}`}
              title="Agregar Ejercicio a esta consulta"
              className="bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark-hover flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Plus className="h-4 w-4" />
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          )}

          {/* Edit Record Button */}
          {r?.version === 'short' && (
            <button
              onClick={() => onEdit(r, false)}
              className="bg-beehealth-yellow-secondary-solid hover:bg-beehealth-yellow-secondary-solid-hover flex items-center justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}

          {/* Delete Record Button */}
          {r?.version === 'short' && (
            <button
              onClick={() => onDelete(r)}
              className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
