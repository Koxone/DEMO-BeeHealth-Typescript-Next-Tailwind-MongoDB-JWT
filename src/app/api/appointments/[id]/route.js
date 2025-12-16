import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { WeightLog } from '@/models/records/WeightLog';
import User from '@/models/User';
import Workout from '@/models/Workout';
import Diet from '@/models/Diet';
import Appointment from '@/models/Appointment';

// @route    GET /api/appointments/:id
// @desc     Get patients appointments by ID
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const appointments = await Appointment.find({ patient: id }).populate(
      'patient',
      'firstName lastName email'
    );

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { message: 'Error fetching appointments', error: error.message },
      { status: 500 }
    );
  }
}
