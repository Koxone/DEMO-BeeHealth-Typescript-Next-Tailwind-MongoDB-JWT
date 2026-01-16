import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Notification from '@/models/announcements/Notification';

// @route    GET /api/notifications/get/massive
// @desc     Get massive announcements
// @access   Private
export async function GET(req) {
  try {
    // DB
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Query
    const announcements = await Notification.find({
      scope: 'massive',
      isActive: true,
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gte: new Date() } }],
    })
      .sort({ createdAt: -1 })
      .lean();

    // Response
    return NextResponse.json({ announcements }, { status: 200 });
  } catch (error) {
    console.error('Error fetching massive announcements:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
