import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    GET /api/auth/me
// @desc     Returns current authenticated user
// @access   Private
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Fetch user data from DB
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return safe user info
    return NextResponse.json(
      {
        message: 'Authenticated user retrieved successfully',
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          hasRecord: user.hasRecord,
          specialty: user.specialty,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('Error fetching user:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
