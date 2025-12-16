import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Workout from '@/models/Workout';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// Auth
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/:id/workouts/remove
// @desc     Remove workout from patient
// @access   Private
export async function PATCH(req, { params }) {
  try {
    // DB
    await connectDB();

    // Params
    const { id } = await params;

    // Validate user id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Body
    const { workoutId, clinicalRecord } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      return NextResponse.json({ error: 'Invalid Workout ID format' }, { status: 400 });
    }

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user: doctor } = auth;

    // User
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Workout
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    // Ensure workouts array
    if (!Array.isArray(user.workouts)) {
      user.workouts = [];
    }

    // Remove workout
    user.workouts = user.workouts.filter((w) => w.workout.toString() !== workoutId);

    await user.save();

    // Timeline event
    await PatientTimeline.create({
      patient: user._id,
      doctor: doctor._id,
      eventType: 'workout_removed',
      clinicalRecord,
      workout: workout._id,
      snapshot: {
        workoutName: workout.name,
        type: workout.type,
      },
      compliance: {
        status: 'completed',
        doctorNotes: 'Entrenamiento removido manualmente por el doctor',
        reviewedAt: new Date(),
        reviewedBy: doctor._id,
      },
      startDate: new Date(),
      completedDate: new Date(),
      isActive: false,
    });

    // Populate
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
      { message: 'Workout removed successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error removing workout' }, { status: 500 });
  }
}
