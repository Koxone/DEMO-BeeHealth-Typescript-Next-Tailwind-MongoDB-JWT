import ConsultsHistory from '../../consults-history/ConsultsHistory';
import WeightChart from '../../WeightChart';
import QuickStats from '../../QuickStats';

export default function ConsultsTab({
  patientId,
  patientRecord,
  specialty,
  questions,
  fetchRecord,
  setShowHistoryModal,
  setShowCreateGoalModal,
  events,
  onOpen,
  onEdit,
  onDelete,
  onAdd,
  onCreateNew,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickStats patientRecord={patientRecord} specialty={specialty} patientId={patientId} />

      {/* Consults Tab */}
      <ConsultsHistory
        questions={questions}
        fetchRecord={fetchRecord}
        specialty={specialty}
        patientId={patientId}
        patientRecord={patientRecord}
        events={events}
        onCreateNew={onCreateNew}
        onOpen={onOpen}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        setShowHistoryModal={setShowHistoryModal}
        setShowCreateGoalModal={setShowCreateGoalModal}
      />

      {/* Weight Chart */}
      <WeightChart id={patientId} />
    </div>
  );
}
