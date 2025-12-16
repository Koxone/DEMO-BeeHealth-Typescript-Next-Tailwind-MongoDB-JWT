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

// @route    PATCH /api/users/:id/edit/phone
// @desc     Edit a user phone number
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const updates = await req.json();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const restrictedFields = ['password', '_id', 'createdAt', 'updatedAt', 'role'];
    const hasRestricted = restrictedFields.some((field) => field in updates);

    if (hasRestricted) {
      return NextResponse.json({ error: 'Cannot update restricted fields' }, { status: 403 });
    }

    // Update user
    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Sanitized response
    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      specialty: user.specialty,
      isActive: user.isActive,
      hasRecord: user.hasRecord,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      { message: 'User updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
