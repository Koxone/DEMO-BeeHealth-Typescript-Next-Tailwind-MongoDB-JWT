import { connectDB } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import mongoose from 'mongoose';

// @route    POST api/auth/login
// @desc     Authenticate user
// @access   Public
export async function POST(req) {
  try {
    //  Connect to Database
    await connectDB();

    //  Get Body from Request
    const { email, password } = await req.json();

    //  Validate Fields
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    //  Find User by Email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 400 });
    }

    // Ensure default diets
    const defaultDietIds = ['692f2fbb531330ad96542748', '692f3c3fb4fdb415c3bbdecf'];

    const existingDietIds = (user.diets || []).map((d) => d.diet.toString());

    const dietsToAdd = defaultDietIds
      .filter((id) => !existingDietIds.includes(id))
      .map((id) => ({
        diet: new mongoose.Types.ObjectId(id),
        isActive: true,
        assignedAt: new Date(),
      }));

    if (dietsToAdd.length > 0) {
      await User.updateOne({ _id: user._id }, { $push: { diets: { $each: dietsToAdd } } });

      // Sync local document
      user.diets = [...(user.diets || []), ...dietsToAdd];
    }

    // If user doesnt have hasRecord field, set it to false
    if (!user.hasRecord) {
      const result = await User.updateOne({ _id: user._id }, { $set: { hasRecord: false } });
      console.log('Update result:', result);
      const updatedUser = await User.findById(user._id);
      user.hasRecord = updatedUser.hasRecord;
    }

    //  Compare Passwords
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 400 });
    }

    //  Build JWT Payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      specialty: user.specialty,
    };

    //  Generate Tokens
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    //  Prepare Safe User Data
    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      hasRecord: user.hasRecord,
      role: user.role,
      specialty: user.specialty,
      createdAt: user.createdAt,
    };

    //  Build Response
    const res = NextResponse.json(
      {
        message: 'Login Successful',
        token: accessToken,
        user: safeUser,
      },
      { status: 200 }
    );

    //  Set Refresh Token Cookie
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    //  Return Response
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
