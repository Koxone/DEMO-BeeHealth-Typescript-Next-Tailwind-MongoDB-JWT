import { getAuthUser } from '@/lib/auth/getAuthUser';
import { connectDB } from '@/lib/mongodb';
import Goal from '@/models/Goal';
import { zDate, zObjectId } from '@/zod/validations/zod';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// @route GET /api/users/:id/goals/
// @desc Get all goals for a patient
// @access Private (Doctor only)
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;

    // Authenticate User
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Zod Validation Schema
    const GoalSchema = z.object({
      _id: zObjectId,
      patient: zObjectId,
      initialWeight: z.number().optional().nullable(),
      goal: z.number(),
      comply: z.boolean().optional().nullable(),
      notes: z.string().optional().nullable(),
      isActive: z.boolean(),
      createdAt: zDate,
    });

    const GoalResponseSchema = z.object({
      goals: z.array(GoalSchema),
    });

    const goals = await Goal.find({ patient: id }).sort({ createdAt: -1 }).lean();

    const validGoals = [];

    for (const goal of goals) {
      const parsed = GoalSchema.safeParse(goal);
      if (parsed.success) {
        validGoals.push(parsed.data);
      } else {
        console.error('Goal corrupto omitido:', {
          goalId: goal._id,
          error: parsed.error.format(),
        });
      }
    }

    return NextResponse.json({ goals: validGoals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
