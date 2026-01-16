'use client';

import { useState, useMemo } from 'react';
import Notifications from './Notifications';
import RegularDays from './RegularDays';

// Feedback Components
import EditAvailableTimesModal from './EditAvailableTimesModal';
import CreateNotificationModal from './modals/notifications/CreateNotificationModal';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetAllSchedule } from '@/@hooks/notifications/useGetAllSchedule';
import { useGetMassiveNotifications } from '@/@hooks/notifications/useGetMassiveNotifications';
import { useGetPersonalNotifications } from '@/@hooks/notifications/useGetPersonalNotifications';
import { useGetPatientsBySpecialty } from '@/@hooks/patients/get/useGetPatientsBySpecialty';
import { useMarkNotificationAsRead } from '@/@hooks/notifications/useMarkNotificationAsRead';
import { useDeactivateMassiveNotification } from '@/@hooks/notifications/useDeactivateMassiveNotification';

function NotificationsManager({ currentUser }) {
  // Current User Specialty
  const specialty = currentUser?.specialty;

  // Data fetch
  const { regularSchedules, specialSchedules, loading, error } = useGetAllSchedule();

  // Personal notifications
  const {
    data: personalNotifications,
    isLoading: notificationsLoading,
    error: notificationsError,
  } = useGetPersonalNotifications(currentUser?.id);

  // Massive notifications
  const {
    data: massiveNotifications,
    isLoading: massiveLoading,
    error: massiveError,
  } = useGetMassiveNotifications(currentUser?.role);

  // Filter massive notifications to only include unread and active ones
  const filteredMassiveNotifications = massiveNotifications?.filter(
    (notification) =>
      notification?.readBy?.includes(currentUser?.id) === false && notification?.isActive === true
  );

  // Patients by specialty (for personal notifications)
  const {
    patients: patientsData,
    isLoading: patientsLoading,
    error: patientsError,
    refetch,
  } = useGetPatientsBySpecialty(specialty);

  // Mark as read hook
  const {
    markAsRead,
    isLoading: markAsReadLoading,
    error: markAsReadError,
  } = useMarkNotificationAsRead();

  // Deactivate massive notification hook
  const {
    deactivateNotification,
    isLoading: deactivateLoading,
    error: deactivateError,
  } = useDeactivateMassiveNotification();

  // Current schedule
  const currentSchedule = regularSchedules?.[0];

  // Normalize week data
  const initialSchedules = useMemo(() => {
    if (!currentSchedule) return [];

    return currentSchedule.week.map((dayItem) => ({
      id: dayItem._id,
      day: dayItem.day,
      timeRanges: dayItem.timeRanges,
      isOpen: dayItem.isActive,
    }));
  }, [currentSchedule]);

  // State
  const [schedules, setSchedules] = useState(initialSchedules);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [showAddClosure, setShowAddClosure] = useState(false);

  // Sync when backend data arrives
  if (currentSchedule && schedules.length === 0) {
    setSchedules(initialSchedules);
  }

  // Toggle
  const handleToggleDay = (id) => {
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, isOpen: !s.isOpen } : s)));
  };

  // Edit
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
  };

  // Save edit
  const handleSaveSchedule = () => {
    setSchedules((prev) => prev.map((s) => (s.id === editingSchedule.id ? editingSchedule : s)));
    setEditingSchedule(null);
  };

  // Loading state
  if (loading || notificationsLoading || massiveLoading || patientsLoading || markAsReadLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error || notificationsError || massiveError || patientsError || markAsReadError) {
    return <div className="p-6 text-red-500">Error al cargar horarios</div>;
  }

  return (
    <div className="mb-20 h-full space-y-4 overflow-y-auto md:mb-0 md:space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Notifications */}
          <Notifications
            currentUser={currentUser}
            personalNotifications={personalNotifications}
            massiveNotifications={filteredMassiveNotifications}
            setShowAddClosure={setShowAddClosure}
            markAsRead={markAsRead}
            deactivateNotification={deactivateNotification}
          />

          {/* Regular Days */}
          <RegularDays
            schedules={schedules}
            handleToggleDay={handleToggleDay}
            handleEditSchedule={handleEditSchedule}
            currentUser={currentUser}
          />
        </div>
      </div>

      {/* Edit modal */}
      {editingSchedule && (
        <EditAvailableTimesModal
          editingSchedule={editingSchedule}
          setEditingSchedule={setEditingSchedule}
          handleSaveSchedule={handleSaveSchedule}
        />
      )}

      {/* Create notification modal */}
      {showAddClosure && (
        <CreateNotificationModal
          patientsData={patientsData}
          setShowAddClosure={setShowAddClosure}
        />
      )}
    </div>
  );
}

export default NotificationsManager;
