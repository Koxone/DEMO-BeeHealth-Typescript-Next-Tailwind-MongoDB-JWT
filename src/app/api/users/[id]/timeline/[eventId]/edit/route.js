import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// @route    PATCH /api/patients/:id/timeline/:eventId/edit
// @desc     Edit timeline event
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id, eventId } = await params;
    const updates = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const event = await PatientTimeline.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Timeline event not found' }, { status: 404 });
    }

    if (event.patient.toString() !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedEvent = await PatientTimeline.findByIdAndUpdate(eventId, updates, {
      new: true,
      runValidators: true,
    })
      .populate('patient', 'fullName email')
      .populate('doctor', 'fullName email')
      .populate('diet', 'name category')
      .populate('workout', 'name category');

    return NextResponse.json(
      { message: 'Timeline event updated', event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating timeline event' }, { status: 500 });
  }
}
