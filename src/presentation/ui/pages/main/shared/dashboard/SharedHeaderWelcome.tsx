import { UserSpecialty, UserRole } from '@/domain/enums/';
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

type HeaderWelcomeProps = {
  role: UserRole;
  specialty: UserSpecialty;
  currentUser: CurrentUserFromAuthStoreType;
};

export default function SharedHeaderWelcome({ role, specialty, currentUser }: HeaderWelcomeProps) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const fullName = currentUser?.name + ' ' + currentUser?.lastName;

  return (
    <div>
      {role === UserRole.DOCTOR && (
        <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
          {specialty === UserSpecialty.WEIGHT ? 'Control de Peso' : `Bienvenida Dra ${fullName}`}
        </h1>
      )}

      {(role === UserRole.PATIENT || role === UserRole.EMPLOYEE) && (
        <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
          Bienvenido(a), {fullName}
        </h1>
      )}

      <p className="text-sm text-gray-600 md:text-base">{today}</p>
    </div>
  );
}
