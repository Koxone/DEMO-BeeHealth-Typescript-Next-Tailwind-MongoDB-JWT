import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// @route    DELETE /api/patients/:id/timeline/:eventId/delete
// @desc     Delete timeline event
// @access   Private
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id, eventId } = await params;

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

    await PatientTimeline.findByIdAndDelete(eventId);

    return NextResponse.json({ message: 'Timeline event deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting timeline event' }, { status: 500 });
  }
}
