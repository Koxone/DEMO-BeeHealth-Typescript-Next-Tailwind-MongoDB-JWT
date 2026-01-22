import ConsultsHistory from '../../consults-history/ConsultsHistory';
import WeightChart from '../../WeightChart';
import QuickStats from '../../QuickStats';

export default function ConsultsTab({
  onAdd,
  onEdit,
  onOpen,
  events,
  userData,
  onDelete,
  questions,
  patientId,
  specialty,
  weightLogs,
  fetchRecord,
  onCreateNew,
  patientRecord,
  hasInitialSize,
  hasInitialWeight,
  hasRecord,
  setShowHistoryModal,
  setShowCreateGoalModal,
  setShowEditWeightAndSizeModal,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      {hasInitialWeight && hasInitialSize && hasRecord && (
        <QuickStats
          specialty={specialty}
          weightLogs={weightLogs}
          patientRecord={patientRecord}
          initialWeight={userData?.initialWeight || 0}
        />
      )}

      {/* Consults Tab */}
      <ConsultsHistory
        onAdd={onAdd}
        onEdit={onEdit}
        onOpen={onOpen}
        events={events}
        onDelete={onDelete}
        questions={questions}
        patientId={patientId}
        specialty={specialty}
        fetchRecord={fetchRecord}
        onCreateNew={onCreateNew}
        refetchUser={fetchRecord}
        patientRecord={patientRecord}
        hasInitialSize={hasInitialSize}
        hasInitialWeight={hasInitialWeight}
        setShowHistoryModal={setShowHistoryModal}
        setShowCreateGoalModal={setShowCreateGoalModal}
        setShowEditWeightAndSizeModal={setShowEditWeightAndSizeModal}
      />

      {/* Weight Chart */}
      <WeightChart id={patientId} />
    </div>
  );
}
