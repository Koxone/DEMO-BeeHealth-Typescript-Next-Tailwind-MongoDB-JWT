'use client';

// UI Components
import { ButtonGoBack } from '../../../shared/buttons/Buttons';
import CreateDietForm from './components/dietForm/CreateDietForm';

export default function CreateDietPage() {
  return (
    <div className="h-full overflow-y-auto">
      <ButtonGoBack />
      <CreateDietForm />
    </div>
  );
}
