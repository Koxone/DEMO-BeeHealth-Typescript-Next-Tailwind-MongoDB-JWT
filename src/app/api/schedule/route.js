import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import RegularSchedule from '@/models/announcements/RegularSchedule';
import SpecialSchedule from '@/models/announcements/SpecialSchedule';

// @route    GET /api/schedule
// @desc     Get all schedules
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

    // Regular schedules
    const regularSchedules = await RegularSchedule.find({}).lean();

    // Special schedules
    const specialSchedules = await SpecialSchedule.find({}).lean();

    // Response
    return NextResponse.json(
      {
        regularSchedules,
        specialSchedules,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
