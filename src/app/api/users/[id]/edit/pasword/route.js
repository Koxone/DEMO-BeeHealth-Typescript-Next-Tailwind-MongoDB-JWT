import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

// @route    PATCH /api/users/:id/edit/password
// @desc     Update user password
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    // Validar que todos los campos estén presentes
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'All password fields are required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'New passwords do not match' }, { status: 400 });
    }

    // Validar longitud mínima
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Obtener usuario
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verificar contraseña actual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    // Hash nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    user.password = hashedPassword;
    await user.save();

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
      { message: 'Password updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating password' }, { status: 500 });
  }
}
