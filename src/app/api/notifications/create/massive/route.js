import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Notification from '@/models/announcements/Notification';

// @route    POST /api/notifications/create
// @desc     Create notification
// @access   Private
export async function POST(req) {
  try {
    // Connect to DataBase
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Body
    const body = await req.json();

    const {
      patient,
      scope,
      category,
      type,
      title,
      message,
      notes,
      relatedDate,
      relatedAppointment,
      scheduledAt,
      expiresAt,
    } = body;

    // Validation for massive and personal
    if (!scope || !category || !type || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validation for personal notifications
    if (scope === 'personal' && (!patient || patient.length === 0)) {
      return NextResponse.json(
        { error: 'Personal notifications require patient field' },
        { status: 400 }
      );
    }

    // Create
    const notification = await Notification.create({
      patient: scope === 'personal' ? patient : undefined,
      scope,
      category,
      type,
      message,
      notes,
      relatedDate,
      relatedAppointment,
      scheduledAt,
      expiresAt,
      createdBy: new mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json(
      {
        message: 'Notification created successfully',
        notification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
