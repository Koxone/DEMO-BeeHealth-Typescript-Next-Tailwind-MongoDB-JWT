import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/:id/diets/toggle
// @desc     Toggle diet active status
// @access   Private
export async function PATCH(req, { params }) {
  try {
    // Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Get dietId and isActive from request body
    const { dietId, isActive, clinicalRecord, action, rating, doctorNotes } = await req.json();

    if (!dietId) {
      return NextResponse.json({ error: 'Diet ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(dietId)) {
      return NextResponse.json({ error: 'Invalid diet ID format' }, { status: 400 });
    }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
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

    // Find diet in array
    const dietAssignment = user.diets.find((d) => d.diet.toString() === dietId);
    if (!dietAssignment) {
      return NextResponse.json({ error: 'Diet not assigned to this user' }, { status: 404 });
    }

    // Update status
    dietAssignment.isActive = isActive;
    if (!isActive && !dietAssignment.finishedAt) {
      dietAssignment.finishedAt = new Date();

      // Create timeline event for diet completion
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'diet_completed',
        clinicalRecord: clinicalRecord,
        diet: dietId,
        snapshot: {
          dietName: diet.name,
          category: diet.category,
        },
        compliance: {
          status: 'completed',
          doctorNotes: 'Dieta marcada como completada por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
          rating: rating,
          doctorNotes: doctorNotes,
        },
        startDate: new Date(),
        completedDate: new Date(),
        isActive: false,
      });
    }

    // Clear finishedAt if reactivating
    if (isActive && dietAssignment.finishedAt) {
      dietAssignment.finishedAt = undefined;

      // Create timeline event for diet reactivation
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'diet_renewed',
        clinicalRecord: clinicalRecord,
        diet: dietId,
        snapshot: {
          dietName: diet.name,
          category: diet.category,
        },
        compliance: {
          status: 'pending',
          doctorNotes: 'Dieta reactivada por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
        },
        startDate: new Date(),
        completedDate: undefined,
        isActive: true,
      });
    }

    // When renewing a diet that is already active
    if (isActive && action === 'renew') {
      await PatientTimeline.create({
        patient: user._id,
        doctor: doctor._id,
        eventType: 'diet_renewed',
        clinicalRecord,
        diet: dietId,
        snapshot: {
          dietName: diet.name,
          category: diet.category,
        },
        compliance: {
          status: 'pending',
          doctorNotes: 'Dieta renovada por el médico.',
          reviewedAt: new Date(),
          reviewedBy: doctor._id,
        },
        startDate: new Date(),
        isActive: true,
      });
    }

    await user.save();

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
      { message: 'Diet status updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating diet status' }, { status: 500 });
  }
}
