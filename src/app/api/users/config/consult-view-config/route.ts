import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/mongodb';
import { getAuthUser } from '@/lib/auth/getAuthUser';

const DEFAULT_CONFIG = {
  selectedQuestions: [],
  questionsOrder: [],
};

// @route    GET /api/users/config/consult-view-config
// @desc     Get consult view config for the authenticated user
// @access   Private
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Read
    const user = await User.findById(userId).select('consultViewConfig');
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    const config = user.consultViewConfig ?? DEFAULT_CONFIG;

    // Init
    if (!user.consultViewConfig) {
      await User.updateOne({ _id: userId }, { $set: { consultViewConfig: DEFAULT_CONFIG } });
    }

    return NextResponse.json({ ok: true, consultViewConfig: config }, { status: 200 });
  } catch (error: any) {
    // Token expired
    if (error?.name === 'TokenExpiredError') {
      return NextResponse.json({ ok: false, error: 'jwt expired' }, { status: 401 });
    }

    console.error('Error fetching consult view config:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// @route    PUT /api/users/config/consult-view-config
// @desc     Update consult view config for the authenticated user
// @access   Private
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Body
    const body = await req.json();
    const { selectedQuestions, questionsOrder } = body;

    // Validate
    if (!Array.isArray(selectedQuestions) || !Array.isArray(questionsOrder)) {
      return NextResponse.json(
        { ok: false, error: 'selectedQuestions y questionsOrder deben ser arrays' },
        { status: 400 }
      );
    }

    // Update
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          consultViewConfig: { selectedQuestions, questionsOrder },
        },
      },
      { new: true, runValidators: true }
    ).select('consultViewConfig');

    if (!user) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { ok: true, consultViewConfig: user.consultViewConfig ?? DEFAULT_CONFIG },
      { status: 200 }
    );
  } catch (error: any) {
    // Token expired
    if (error?.name === 'TokenExpiredError') {
      return NextResponse.json({ ok: false, error: 'jwt expired' }, { status: 401 });
    }

    console.error('Error updating consult view config:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
