import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import Workout from '@/models/Workout';
import User from '@/models/User';

// @route    DELETE /api/workouts/delete
// @desc     Delete a workout by id from body
// @access   Private
export async function DELETE(req) {
  try {
    // Connect DB
    await connectDB();

    // Auth user
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User is not authenticated',
            reason: 'Valid authentication credentials were not provided',
          },
        },
        { status: 401 }
      );
    }

    // Body parsing
    const body = await req.json();
    const { id } = body;

    // Body validation
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_ID',
            message: 'Invalid workout id',
            reason: 'The provided id is missing or not a valid MongoDB ObjectId',
          },
        },
        { status: 400 }
      );
    }

    // Find and delete
    const deletedWorkout = await Workout.findByIdAndDelete(id);

    // Not found
    if (!deletedWorkout) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Workout not found',
            reason: 'No workout exists with the provided id',
          },
        },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(
      {
        ok: true,
        message: 'Workout deleted successfully',
        data: deletedWorkout,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting workout:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while deleting the workout',
          reason: 'Please try again later or contact support',
        },
      },
      { status: 500 }
    );
  }
}
