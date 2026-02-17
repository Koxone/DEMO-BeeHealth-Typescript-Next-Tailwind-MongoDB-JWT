// Input components
import Text from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/Text';
import Number from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/Number';
import Date from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/Date';
import Select from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/Select';
import Radio from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/Radio';
import Textarea from '@/presentation/ui/pages/main/patient/create-clinical-history/components/inputs/TextArea';

// Category order
export const CATEGORY_ORDER = [
  'Datos Generales',
  'Antropometria',
  'Antecedentes Personales',
  'Patologias',
  'Antecedentes Personales No Patologicos',
  'Medicamentos',
  'Informacion',
  'Antecedentes Heredofamiliares',
  'Alimentacion',
  'Inmunizaciones',
  'Signos Vitales',
];

// Question type to component map
export const QuestionComponents: Record<string, any> = {
  text: Text,
  date: Date,
  number: Number,
  select: Select,
  radio: Radio,
  textarea: Textarea,
};
