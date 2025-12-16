import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import Workout from '@/models/Workout';
import User from '@/models/User';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { WeightLog } from '@/models/records/WeightLog';

// @route    DELETE /api/clinicalRecords/:id/delete
// @desc     Delete a clinical record by ID
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
            message: 'Invalid record id',
            reason: 'The provided id is missing or not a valid MongoDB ObjectId',
          },
        },
        { status: 400 }
      );
    }

    // Find and delete
    const deletedRecord = await ClinicalRecord.findByIdAndDelete(id);

    // Cascade delete related WeightLogs
    const weightLogsToDelete = await WeightLog.find({ clinicalRecord: id });
    await WeightLog.deleteMany({ clinicalRecord: id });

    // Not found
    if (!deletedRecord) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Clinical record not found',
            reason: 'No clinical record exists with the provided id',
          },
        },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(
      {
        ok: true,
        message: 'Clinical record deleted successfully',
        data: deletedRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting clinical record:', error);
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
