import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import mongoose from 'mongoose';
import User from '@/models/User';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import Workout from '@/models/Workout';

// @route    GET /api/clinicalRecords/:id
// @desc     Get clinical records by patient ID
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing patient ID' }, { status: 400 });
    }

    const records = await ClinicalRecord.find({ patient: id })
      .sort({ createdAt: -1 })
      .populate('patient', 'fullName email phone avatar')

      /* Populate diets */
      .populate('diets', 'name')

      /* Populate workouts */
      .populate('workouts', 'name')

      /* Populate answers.question */
      .populate({
        path: 'answers.question',
        model: 'Question',
        select: 'questionId text specialty version type options isMetric',
      })
      .lean();

    return NextResponse.json({ data: records || [] });
  } catch (err) {
    console.error('Error GET clinicalRecords/[id]:', err);
    return NextResponse.json({ error: 'Error fetching clinical records' }, { status: 500 });
  }
}
