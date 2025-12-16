import DietForm from './components/dietForm/DietForm';
import TopBar from './components/TopBar';

export default function DoctorDietNew() {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <TopBar label="Volver a Dietas" />

      <DietForm />
    </div>
  );
}
