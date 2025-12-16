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

// @route    GET /api/workouts
// @desc     Get all workouts
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    const workouts = await Workout.find().populate('patients.patient', 'fullName email');

    return NextResponse.json({ workouts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
