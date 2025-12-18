interface Answer {
  question: {
    _id: string;
    questionId: number;
    text: string;
    type: string;
    category: string;
    required?: boolean;
    version?: string;
    specialty?: string;
    isMetric?: boolean;
    options?: Array<{ value: string; label: string; _id: string }>;
    placeholder?: string;
  };
  questionId: number;
  value: string;
  _id: string;
}

interface Patient {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
}

interface HistoryRecord {
  _id: string;
  patient: Patient;
  diets: any[];
  workouts: any[];
  specialty: string;
  version: string;
  answers: Answer[];
  recordDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ConsultCardProps {
  r: HistoryRecord;
  onEdit: (record: HistoryRecord, readOnly: boolean) => void;
  onOpen: (record: HistoryRecord, readOnly: boolean) => void;
  onDelete: (record: HistoryRecord) => void;
  questions: any[];
  specialty: string;
  fetchRecord: () => void;
  setShowHistoryModal: (show: boolean) => void;
  patientRecord: HistoryRecord[];
  patientId: string;
  events: any[];
  selectedQuestions: number[];
  questionsOrder: number[];
  onOrderChange: (newOrder: number[]) => void;
}

// block: types
interface Question {
  questionId: number;
  text: string;
  category: string;
}

interface ConfigConsultModalProps {
  selectedQuestions: number[];
  allQuestions: Question[];
  filteredQuestions: Question[];
  searchTerm: string;
  selectedCategory: string;
  CATEGORIES: string[];
  groupedQuestions: Record<string, Question[]>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: (value: boolean) => void;
  toggleAll: () => void;
  toggleCategory: (category: string) => void;
  toggleQuestion: (questionId: number) => void;
}

export type {
  Answer,
  Patient,
  HistoryRecord as Record,
  ConsultCardProps,
  Question,
  ConfigConsultModalProps,
};
