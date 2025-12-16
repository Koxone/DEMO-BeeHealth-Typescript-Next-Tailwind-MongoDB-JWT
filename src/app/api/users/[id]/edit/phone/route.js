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
// @desc     Update user phone
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validar formato phone (7-15 dígitos)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Phone must be 7-15 digits' }, { status: 400 });
    }

    // Verificar que phone no exista
    const existingUser = await User.findOne({ phone });
    if (existingUser && existingUser._id.toString() !== id) {
      return NextResponse.json({ error: 'Phone number already in use' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, { phone }, { new: true, runValidators: true });

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
      { message: 'Phone updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating phone' }, { status: 500 });
  }
}
