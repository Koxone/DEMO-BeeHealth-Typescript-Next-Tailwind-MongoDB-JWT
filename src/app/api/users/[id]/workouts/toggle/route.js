import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Workout from '@/models/Workout';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/:id/workouts/toggle
// @desc     Toggle workout active status
// @access   Private
export async function PATCH(req, { params }) {
  try {
    // Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Get workoutId and isActive from request body
    const { workoutId, isActive, clinicalRecord, action } = await req.json();

    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      return NextResponse.json({ error: 'Invalid workout ID format' }, { status: 400 });
    }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
    }

    // Validate Doctor Authentication
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user: doctor } = auth;

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate that workout exists
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    // Find workout in array
    const workoutAssignment = user.workouts.find((w) => w.workout.toString() === workoutId);
    if (!workoutAssignment) {
      return NextResponse.json({ error: 'Workout not assigned to this user' }, { status: 404 });
    }

    // Update status
    workoutAssignment.isActive = isActive;

    // If marking as completed and not already finished, set finishedAt and create timeline event
    if (!isActive && !workoutAssignment.finishedAt) {
      workoutAssignment.finishedAt = new Date();

      // Create timeline event for workout completion
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'workout_completed',
        clinicalRecord: clinicalRecord,
        workout: workoutId,
        snapshot: {
          workoutName: workout.name,
          type: workout.type,
        },
        compliance: {
          status: 'completed',
          doctorNotes: 'Entrenamiento marcado como completado por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
        },
        startDate: new Date(),
        completedDate: new Date(),
        isActive: false,
      });
    }

    // Clear finishedAt if reactivating
    if (isActive && workoutAssignment.finishedAt) {
      workoutAssignment.finishedAt = undefined;

      // Create timeline event for workout reactivation
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'workout_renewed',
        clinicalRecord: clinicalRecord,
        workout: workoutId,
        snapshot: {
          workoutName: workout.name,
          type: workout.type,
        },
        compliance: {
          status: 'pending',
          doctorNotes: 'Entrenamiento reactivado por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
        },
        startDate: new Date(),
        completedDate: undefined,
        isActive: true,
      });
    }

    // When renewing a workout that is already active
    if (isActive && action === 'renew') {
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'workout_renewed',
        clinicalRecord,
        workout: workoutId,
        snapshot: {
          workoutName: workout.name,
          type: workout.type,
        },
        compliance: {
          status: 'pending',
          doctorNotes: 'Entrenamiento renovado por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
        },
        startDate: new Date(),
        isActive: true,
      });
    }

    await user.save();

    const populatedUser = await User.findById(id).populate('workouts.workout');

    const safeUser = {
      id: populatedUser._id,
      fullName: populatedUser.fullName,
      email: populatedUser.email,
      phone: populatedUser.phone,
      avatar: populatedUser.avatar,
      role: populatedUser.role,
      specialty: populatedUser.specialty,
      workouts: populatedUser.workouts,
      updatedAt: populatedUser.updatedAt,
    };

    return NextResponse.json(
      { message: 'Workout status updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating workout status' }, { status: 500 });
  }
}
