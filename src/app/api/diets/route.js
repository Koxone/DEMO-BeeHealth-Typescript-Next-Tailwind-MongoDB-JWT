import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';
import User from '@/models/User';
import Diet from '@/models/Diet';

// @route    GET /api/diets
// @desc     Get all diets
// @access   Private
export async function GET(req) {
  try {
    // Connect to database
    await connectDB();

    const diets = await Diet.find().populate('doctor', 'fullName email');

    return NextResponse.json({ diets }, { status: 200 });
  } catch (error) {
    console.error('Error fetching diets:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
