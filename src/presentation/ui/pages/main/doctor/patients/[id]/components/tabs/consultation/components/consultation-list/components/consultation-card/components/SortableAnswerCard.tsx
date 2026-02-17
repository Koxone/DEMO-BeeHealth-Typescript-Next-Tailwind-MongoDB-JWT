// Next, React and Other Libraries
import { GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Services, Mappers, Constants and Helpers
import { CATEGORY_BG_MAP } from '@/presentation/constants/consultation';

function SortableAnswerCard({ answer }) {
  const category = answer?.questionText;
  const questionId = answer?.questionId;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: questionId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isRadioType = answer?.questionType === 'radio';
  const displayValue = isRadioType ? 'Sí' : answer.value;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        'group bg-beehealth-blue-primary-dark relative h-full rounded-lg p-2 ' +
        (CATEGORY_BG_MAP[category] || CATEGORY_BG_MAP.Otros)
      }
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 right-1 cursor-grab rounded bg-white/10 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20 active:cursor-grabbing"
      >
        <GripVertical className="h-3 w-3 text-white" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white sm:gap-2">
        <span className="truncate">{answer?.questionText}:</span>
      </div>

      <p className="text-sm font-medium wrap-break-word text-white">{displayValue}</p>
    </div>
  );
}

export default SortableAnswerCard;
