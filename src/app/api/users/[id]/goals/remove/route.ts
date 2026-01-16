import { NextResponse } from 'next/server';
import { z } from 'zod';

import { connectDB } from '@/lib/mongodb';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Goal from '@/models/Goal';

// @route    PATCH /api/users/[id]/goals/remove
// @desc     Deactivate a goal and set comply status
// @access   Private (Doctor only)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Database
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Params
    const { id } = await params;

    // Params validation
    const paramsSchema = z.object({
      id: z.string().min(1),
    });

    paramsSchema.parse({ id });

    // Body validation
    const bodySchema = z.object({
      goalId: z.string().min(1),
      comply: z.boolean(),
    });

    const { goalId, comply } = bodySchema.parse(await req.json());

    // Find goal
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return NextResponse.json({ message: 'Goal not found' }, { status: 404 });
    }

    // Ownership check
    if (goal.patient.toString() !== id) {
      return NextResponse.json({ message: 'Goal does not belong to the patient' }, { status: 403 });
    }

    // Update goal
    goal.isActive = false;
    goal.comply = comply;
    await goal.save();

    return NextResponse.json({ message: 'Goal finalized successfully' }, { status: 200 });
  } catch (error) {
    // Error handling
    console.error('Error finalizing goal:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
