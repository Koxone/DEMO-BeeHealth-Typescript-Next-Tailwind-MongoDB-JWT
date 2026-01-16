import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import Notification from '@/models/announcements/Notification';

// @route    PATCH /api/notifications/toggle/massive
// @desc     Deactivate massive notification
// @access   Private
export async function PATCH(req) {
  try {
    await connectDB();

    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json({ error: 'notificationId is required' }, { status: 400 });
    }

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { isActive: false },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: 'Notification deactivated' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
