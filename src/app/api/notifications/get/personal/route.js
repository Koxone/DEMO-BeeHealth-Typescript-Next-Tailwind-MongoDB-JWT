import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Models
import Notification from '@/models/announcements/Notification';

// @route    POST /api/notifications/get/personal
// @desc     Get personal notifications for a user
// @access   Private
export async function POST(req) {
  try {
    // DB
    await connectDB();

    // Body
    const { userId } = await req.json();

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
    }

    // Query
    const notifications = await Notification.find({
      scope: 'personal',
      user: userId,
      isActive: true,
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gte: new Date() } }],
    })
      .sort({ createdAt: -1 })
      .lean();

    // Response
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error('Error fetching personal notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
