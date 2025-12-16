import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { WeightLog } from '@/models/records/WeightLog';
import Workout from '@/models/Workout';
import User from '@/models/User';
import Diet from '@/models/Diet';

// @route    DELETE /api/diets/[id]/delete
// @desc     Delete a diet by ID
// @access   Private
export async function DELETE(req, { params }) {
  try {
    // Connect DB
    await connectDB();

    // Validate ID
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_ID',
            message: 'The provided ID is not valid',
            reason: 'The ID does not conform to the expected format for MongoDB ObjectIDs',
          },
        },
        { status: 400 }
      );
    }

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

    // Check if diet exists
    const dietToDelete = await Diet.findById(id);
    if (!dietToDelete) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'DIET_NOT_FOUND',
            message: 'Diet not found',
            reason: 'No diet exists with the provided ID',
          },
        },
        { status: 404 }
      );
    }

    // Delete diet
    await Diet.findByIdAndDelete(id);

    return NextResponse.json(
      {
        ok: true,
        message: 'Diet deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting diet:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while deleting the diet',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
