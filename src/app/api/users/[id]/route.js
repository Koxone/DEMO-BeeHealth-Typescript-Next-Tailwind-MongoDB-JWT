import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

// @route    GET /api/users/:id
// @desc     Get a specific User by ID
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const user = await User.findById(id, '-password');

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 });
  }
}
