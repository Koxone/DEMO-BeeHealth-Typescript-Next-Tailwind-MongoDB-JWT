// /api/clinicalRecords/weight-logs/total/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { WeightLog } from '@/models/records/WeightLog';

// @route    GET /api/clinicalRecords/weight-logs/total
// @desc     Get total weight lost (only negative differences)
// @access   Public (para landing page)
export async function GET() {
  try {
    await connectDB();

    const result = await WeightLog.aggregate([
      { $match: { differenceFromPrevious: { $lt: 0 } } },
      {
        $group: {
          _id: null,
          totalLost: { $sum: { $abs: '$differenceFromPrevious' } },
        },
      },
    ]);

    const totalLost = result[0]?.totalLost || 0;

    return NextResponse.json({ totalLost }, { status: 200 });
  } catch (error) {
    console.error('Error fetching total weight lost:', error);
    return NextResponse.json(
      { message: 'Error fetching total weight lost', error: error.message },
      { status: 500 }
    );
  }
}
