import { connectDB } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/User';

// @route    POST api/auth/signup
// @desc     Create New User
// @access   Public
export async function POST(req) {
  try {
    // Connect to DataBase
    await connectDB();

    // Get Body from Request
    const { fullName, email, phone, password, role, specialty } = await req.json();
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ error: 'All Fields are required' }, { status: 400 });
    }

    // Check if User Data already exists
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return NextResponse.json({ error: 'Email or Phone Number already exists' }, { status: 400 });
    }

    // Hash Password
    const hashed = await bcrypt.hash(password, 10);

    // Create User Document in DB
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashed,
      isActive: true,
      hasRecord: false,
      role: role || 'patient',
      specialty: specialty || 'none',
    });

    // Build JWT payload
    const payload = { id: user._id, email: user.email, role: user.role };

    // Access Token and Refresh token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Sanitize User Response (exclude Password)
    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      specialty: user.specialty,
      hasRecord: user.hasRecord,
      createdAt: user.createdAt,
    };

    // Build Response
    const res = NextResponse.json(
      {
        message: 'User created Successfully',
        token: accessToken,
        user: safeUser,
      },
      { status: 201 }
    );

    // Set Refresh token Cookie
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
