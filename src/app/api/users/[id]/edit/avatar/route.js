import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';

// @route    PATCH /api/users/:id/edit/avatar
// @desc     Update user avatar
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { avatar } = await req.json();

    if (!avatar) {
      return NextResponse.json({ error: 'Avatar is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validar que sea una URL válida
    try {
      new URL(avatar);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid avatar URL' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });

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
      { message: 'Avatar updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating avatar' }, { status: 500 });
  }
}
