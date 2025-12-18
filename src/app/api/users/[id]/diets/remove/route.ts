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
import PatientTimeline from '@/models/records/PatientTimeline';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/:id/diets/remove
// @desc     Remove diet from patient
// @access   Private
export async function PATCH(req, { params }) {
  try {
    // Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Get dietId from request body
    const { dietId, clinicalRecord, doctorNotes } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(dietId)) {
      return NextResponse.json({ error: 'Invalid Diet ID format' }, { status: 400 });
    }

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user: doctor } = auth;

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate that diet exists
    const diet = await Diet.findById(dietId);
    if (!diet) {
      return NextResponse.json({ error: 'Diet not found' }, { status: 404 });
    }

    // Ensure diets array
    if (!Array.isArray(user.diets)) {
      user.diets = [];
    }

    // Remove diet from array
    user.diets = user.diets.filter((d) => d.diet.toString() !== dietId);
    await user.save();

    // Create timeline event
    await PatientTimeline.create({
      patient: user._id,
      doctor: doctor._id,
      eventType: 'diet_removed',
      clinicalRecord: clinicalRecord,
      diet: diet._id,
      snapshot: {
        dietName: diet.name,
        category: diet.category,
      },
      compliance: {
        status: 'not_completed',
        doctorNotes: doctorNotes || 'Dieta removida manualmente por el doctor',
        reviewedAt: new Date(),
        reviewedBy: doctor._id,
      },
      startDate: new Date(),
      completedDate: new Date(),
      isActive: false,
    });

    const populatedUser = await User.findById(id).populate('diets.diet');

    const safeUser = {
      id: populatedUser._id,
      fullName: populatedUser.fullName,
      email: populatedUser.email,
      phone: populatedUser.phone,
      avatar: populatedUser.avatar,
      role: populatedUser.role,
      specialty: populatedUser.specialty,
      diets: populatedUser.diets,
      updatedAt: populatedUser.updatedAt,
    };

    return NextResponse.json(
      { message: 'Diet removed successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error removing diet' }, { status: 500 });
  }
}
