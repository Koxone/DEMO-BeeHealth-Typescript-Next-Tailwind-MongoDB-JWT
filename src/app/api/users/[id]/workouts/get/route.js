import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';
import User from '@/models/User';
import Diet from '@/models/Diet';
import Workout from '@/models/Workout';

// @route    GET /api/users/:id/workouts/get
// @desc     Get all workouts for a user
// @access   Private

export async function GET(req, { params }) {
  try {
    // Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format for this user' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userWorkouts = await User.findById(id).populate('workouts.workout');

    return NextResponse.json(
      {
        success: true,
        data: userWorkouts.workouts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching workouts for this user' }, { status: 500 });
  }
}
