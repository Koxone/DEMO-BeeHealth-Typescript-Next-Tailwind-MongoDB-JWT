import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { WeightLog } from '@/models/records/WeightLog';
import User from '@/models/User';
import Workout from '@/models/Workout';
import Diet from '@/models/Diet';

// Custom Hooks
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    GET /api/clinicalRecords/weight-logs
// @desc     Get all Weight Logs
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    const logs = await WeightLog.find()
      .populate('patient', 'fullName phone email')
      .populate('clinicalRecord', 'recordDate');

    return NextResponse.json({ weightLogs: logs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching weight logs:', error);
    return NextResponse.json(
      { message: 'Error fetching weight logs', error: error.message },
      { status: 500 }
    );
  }
}
