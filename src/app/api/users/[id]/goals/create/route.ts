import { getAuthUser } from '@/lib/auth/getAuthUser';
import { connectDB } from '@/lib/mongodb';
import Goal from '@/models/Goal';
import { NextResponse } from 'next/server';
import { z } from 'zod';

interface GoalData {
  goal: number;
  notes?: string;
}

// @route POST /api/users/:id/goals/create
// @desc Create a new goal for a patient
// @access Private (Doctor only)
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;

    // Authenticate User
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Validate Request Body
    const CreateGoalSchema = z.object({
      goal: z.number(),
      notes: z.string().optional(),
      initialWeight: z.number().optional(),
    });

    const body: GoalData = await req.json();
    const parsedBody = CreateGoalSchema.safeParse(body);

    // Validation Error
    if (!parsedBody.success) {
      console.error('Zod validation error:', parsedBody.error.format());
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    const { goal, notes, initialWeight } = parsedBody.data;

    // Validate if goal is greater than initialWeight
    if (initialWeight !== undefined && goal >= initialWeight) {
      return NextResponse.json(
        { message: 'Goal must be less than initial weight' },
        { status: 400 }
      );
    }

    // Validate if patient has an active goal
    const activeGoal = await Goal.findOne({ patient: id, isActive: true });
    if (activeGoal) {
      return NextResponse.json({ message: 'Patient already has an active goal' }, { status: 400 });
    }

    // Create new goal
    const newGoal = new Goal({
      patient: id,
      isActive: true,
      initialWeight,
      goal,
      notes,
    });

    await newGoal.save();

    return NextResponse.json(
      { message: 'Goal created successfully', goal: newGoal },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
