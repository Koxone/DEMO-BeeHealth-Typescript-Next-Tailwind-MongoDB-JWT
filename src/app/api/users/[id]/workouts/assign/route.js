import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Workout from '@/models/Workout';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/:id/workouts/assign
// @desc     Assign workout to patient
// @access   Private
export async function PATCH(req, { params }) {
  try {
    /// Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Get workoutId and assignedAt from request body
    const { workoutId, assignedAt, clinicalRecord } = await req.json();

    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      return NextResponse.json({ error: 'Invalid workout ID format' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Auth user
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user: doctor } = auth;

    // Validate that workout exists
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    // Check if workout is already assigned
    const alreadyAssigned = user.workouts.some((w) => w.workout.toString() === workoutId);

    // Reactivate
    if (alreadyAssigned) {
      const workoutEntry = user.workouts.find((w) => w.workout.toString() === workoutId);

      workoutEntry.isActive = true;
      workoutEntry.assignedAt = assignedAt ? new Date(assignedAt) : new Date();
      workoutEntry.finishedAt = undefined;
      workoutEntry.clinicalRecord = clinicalRecord;

      await user.save();

      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        clinicalRecord,
        eventType: 'workout_assigned',
        workout: workout._id,
        snapshot: {
          workoutName: workout.name,
          type: workout.type,
        },
        compliance: {
          status: 'pending',
          doctorNotes: 'Ejercicio asignado, pendiente de realización por el paciente.',
        },
        startDate: assignedAt ? new Date(assignedAt) : new Date(),
      });

      const populatedUser = await User.findById(id).populate('workouts.workout');

      return NextResponse.json(
        {
          message: 'Workout assigned successfully',
          user: {
            id: populatedUser._id,
            fullName: populatedUser.fullName,
            email: populatedUser.email,
            phone: populatedUser.phone,
            avatar: populatedUser.avatar,
            role: populatedUser.role,
            specialty: populatedUser.specialty,
            workouts: populatedUser.workouts,
            updatedAt: populatedUser.updatedAt,
          },
        },
        { status: 200 }
      );
    }

    // First assign
    user.workouts.push({
      workout: new mongoose.Types.ObjectId(workoutId),
      isActive: true,
      clinicalRecord,
      assignedAt: assignedAt ? new Date(assignedAt) : new Date(),
    });

    await user.save();

    await PatientTimeline.create({
      patient: user._id,
      doctor: doctor._id,
      clinicalRecord,
      eventType: 'workout_assigned',
      workout: workout._id,
      snapshot: {
        workoutName: workout.name,
        type: workout.type,
      },
      compliance: {
        status: 'pending',
        doctorNotes: 'Ejercicio asignado por primera vez.',
      },
      startDate: assignedAt ? new Date(assignedAt) : new Date(),
    });

    const populatedUser = await User.findById(id).populate('workouts.workout');

    return NextResponse.json(
      {
        message: 'Workout assigned successfully',
        user: {
          id: populatedUser._id,
          fullName: populatedUser.fullName,
          email: populatedUser.email,
          phone: populatedUser.phone,
          avatar: populatedUser.avatar,
          role: populatedUser.role,
          specialty: populatedUser.specialty,
          workouts: populatedUser.workouts,
          updatedAt: populatedUser.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error assigning workout' }, { status: 500 });
  }
}
