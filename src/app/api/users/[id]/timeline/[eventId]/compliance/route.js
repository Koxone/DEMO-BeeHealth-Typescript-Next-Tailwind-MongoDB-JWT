import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// @route    PATCH /api/patients/:id/timeline/:eventId/compliance
// @desc     Update compliance status
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id, eventId } = await params;
    const { status, rating, doctorNotes } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    if (!['pending', 'completed', 'partial', 'not_completed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid compliance status' }, { status: 400 });
    }

    const event = await PatientTimeline.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Timeline event not found' }, { status: 404 });
    }

    if (event.patient.toString() !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    event.compliance = {
      status,
      rating,
      doctorNotes,
      reviewedAt: new Date(),
      reviewedBy: new mongoose.Types.ObjectId(),
    };

    if (status === 'completed') {
      event.completedDate = new Date();
    }

    await event.save();

    const populatedEvent = await PatientTimeline.findById(eventId)
      .populate('patient', 'fullName email')
      .populate('doctor', 'fullName email')
      .populate('diet', 'name category')
      .populate('workout', 'name category');

    return NextResponse.json(
      { message: 'Compliance updated', event: populatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating compliance' }, { status: 500 });
  }
}
