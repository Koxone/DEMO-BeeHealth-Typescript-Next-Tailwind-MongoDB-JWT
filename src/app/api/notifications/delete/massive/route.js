import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline from '@/models/records/PatientTimeline';
import Notification from '@/models/announcements/Notification';

// @route    PATCH /api/notifications/delete/massive
// @desc     Delete notification by ID
// @access   Private
export async function DELETE(req) {
  try {
    // Connect to DataBase
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    // Get IDs from request body
    const { notificationId } = await req.json();

    // Find Notification
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting timeline event' }, { status: 500 });
  }
}
