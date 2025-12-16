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

// Helpers
function getMexicoDateRange() {
  const timeZone = 'America/Mexico_City';

  const now = new Date();

  const todayStr = now.toLocaleDateString('en-CA', { timeZone });
  const today = new Date(`${todayStr}T00:00:00-06:00`);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return { today, tomorrow };
}

// @route    GET /api/consults
// @desc     Get all consults
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    const { today, tomorrow } = getMexicoDateRange();

    const consults = await Consultation.find({
      createdAt: { $gte: today, $lt: tomorrow },
    })
      .populate('patient')
      .populate('employee')
      .populate('itemsSold.product')
      .populate('itemsSold.inventory')
      .lean();

    return NextResponse.json(consults, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
