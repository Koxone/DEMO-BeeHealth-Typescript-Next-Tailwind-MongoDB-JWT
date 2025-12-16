'use client';

import EmployeePatientCard from './EmployeePatientCard';

export default function EmployeePatientsList({ currentUser, role, searchTerm, patients }) {
  const sortedPatients = [...patients].sort((a, b) => a.fullName.localeCompare(b.fullName));
  const filteredPatients = sortedPatients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.fullName.toLowerCase().includes(searchLower) ||
      patient.phone.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto">
      {filteredPatients.map((patient) => (
        <EmployeePatientCard
          key={patient._id}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}
