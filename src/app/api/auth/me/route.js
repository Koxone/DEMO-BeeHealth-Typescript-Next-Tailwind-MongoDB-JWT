import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

// @route    GET /api/auth/me
// @desc     Returns current authenticated user
// @access   Private
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read cookies
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value || null;

    // Read Authorization header
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // Prefer accessToken from header, else use refreshToken
    const token = bearerToken || refreshToken;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Fetch user data from DB
    const user = await User.findById(decoded.id).select('-password');
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
