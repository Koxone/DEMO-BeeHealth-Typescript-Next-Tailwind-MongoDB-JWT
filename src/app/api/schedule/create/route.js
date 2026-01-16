import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import RegularSchedule from '@/models/announcements/RegularSchedule';

// @route    POST /api/schedule/create
// @desc     Create a new regular schedule
// @access   Private
export async function POST(req) {
  try {
    // Connect to DB
    await connectDB();

    // Authenticate user
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Parse request body
    const { specialty, week } = await req.json();

    // Validate required fields
    if (!specialty || !week || !Array.isArray(week)) {
      return NextResponse.json(
        { error: 'Specialty and week schedule are required' },
        { status: 400 }
      );
    }

    // Check if schedule already exists for this specialty
    const existingSchedule = await RegularSchedule.findOne({ specialty });

    if (existingSchedule) {
      return NextResponse.json(
        { error: 'Schedule already exists for this specialty' },
        { status: 409 }
      );
    }

    // Create new Regular Schedule
    const newSchedule = new RegularSchedule({
      specialty,
      week,
    });

    await newSchedule.save();

    return NextResponse.json(
      {
        message: 'Regular schedule created successfully',
        schedule: newSchedule,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating regular schedule:', error);

    // Validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json({ error: 'Validation error', details: errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
