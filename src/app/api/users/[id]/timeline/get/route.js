import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Diet from '@/models/Diet';
import User from '@/models/User';
import Workout from '@/models/Workout';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';
import PatientTimeline from '@/models/records/PatientTimeline';

// @route    GET /api/users/:id/timeline/get
// @desc     Get timeline events for a user
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch timeline events for the user, sorted by date descending
    const timelineEvents = await PatientTimeline.find({ patient: id })
      .populate('doctor', 'fullName email role specialty')
      .populate('patient', 'fullName email')
      .populate('diet', 'name category description')
      .sort({ createdAt: -1 });

    return NextResponse.json({ events: timelineEvents }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching timeline events' }, { status: 500 });
  }
}
