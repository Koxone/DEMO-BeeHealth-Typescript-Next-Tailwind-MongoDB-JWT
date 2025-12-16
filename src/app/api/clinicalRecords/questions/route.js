import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';

// @route    GET /api/clinicalRecords/questions
// @desc     Get all clinical record questions
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    const questions = await Question.find({}).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, data: questions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clinical record questions:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: Unable to fetch clinical record questions' },
      { status: 500 }
    );
  }
}
