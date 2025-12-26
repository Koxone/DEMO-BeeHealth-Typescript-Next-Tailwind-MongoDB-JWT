import { connectDB } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import mongoose from 'mongoose';

// Zod Schemas
import { signupSchema } from '@/zod/auth/auth.signup.schema';

// @route    POST api/auth/signup
// @desc     Create New User
// @access   Public
export async function POST(req) {
  try {
    // Connect to DataBase
    await connectDB();

    // Parse
    const body = await req.json();

    // Validate
    const { fullName, email, phone, password, role, specialty } = signupSchema.parse({
      ...body,
      email: body.email?.trim().toLowerCase(),
    });

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
      diets: [
        {
          diet: new mongoose.Types.ObjectId('692f2fbb531330ad96542748'),
          isActive: true,
          assignedAt: new Date(),
        },
        {
          diet: new mongoose.Types.ObjectId('692f3c3fb4fdb415c3bbdecf'),
          isActive: true,
          assignedAt: new Date(),
        },
      ],
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
      secure: true,
      sameSite: 'none',
      path: '/api/auth/refresh',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    if (error?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid signup data' }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
