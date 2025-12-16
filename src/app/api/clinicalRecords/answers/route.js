import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';

// @route    POST /api/clinicalRecords/answers
// @desc     Get all clinical record questions
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    const { questionId, value } = await req.json();
    if (!questionId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'questionId is required',
            reason: 'No questionId provided in request body',
          },
        },
        { status: 400 }
      );
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Question not found',
            reason: `No question found with ID ${questionId}`,
          },
        },
        { status: 404 }
      );
    }

    const newAnswer = new Answer({
      question: question._id,
      value: value ?? null,
    });

    await newAnswer.save();

    return NextResponse.json({
      ok: true,
      answer: newAnswer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An unexpected error occurred',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
