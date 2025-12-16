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

// @route    PATCH /api/users/:id/edit/email
// @desc     Update user email
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validar formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Verificar que email no exista
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== id) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { email: email.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      specialty: user.specialty,
      isActive: user.isActive,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      { message: 'Email updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating email' }, { status: 500 });
  }
}
