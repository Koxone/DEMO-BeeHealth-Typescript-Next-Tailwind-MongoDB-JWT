import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Workout from '@/models/Workout';

// Utility: Validate URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// @route    POST /api/workouts/create
// @desc     Create a new workout
// @access   Private
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Authenticate user
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User is not authenticated',
            reason: 'The request did not include valid authentication credentials',
          },
        },
        { status: 401 }
      );
    }

    const { userId } = authUser;

    // Parse request body
    let payload;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_JSON',
            message: 'Invalid request body',
            reason: 'The request body must be valid JSON',
          },
        },
        { status: 400 }
      );
    }

    const {
      patients,
      name,
      type,
      difficulty,
      duration,
      about,
      instructions,
      benefits,
      cautions,
      images,
      video,
    } = payload;

    // Validate required fields - strings
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_NAME',
            message: 'Invalid exercise name',
            reason: 'The name field is required and must be a non-empty string',
          },
        },
        { status: 400 }
      );
    }

    if (
      !type ||
      typeof type !== 'string' ||
      !['Fuerza', 'Cardio', 'Core', 'Flexibilidad'].includes(type)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_TYPE',
            message: 'Invalid exercise type',
            reason: 'The type must be one of: Fuerza, Cardio, Core, Flexibilidad',
          },
        },
        { status: 400 }
      );
    }

    if (
      !difficulty ||
      typeof difficulty !== 'string' ||
      !['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_DIFFICULTY',
            message: 'Invalid difficulty level',
            reason: 'The difficulty must be one of: Beginner, Intermediate, Advanced',
          },
        },
        { status: 400 }
      );
    }

    if (!about || typeof about !== 'string' || !about.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_ABOUT',
            message: 'Invalid exercise description',
            reason: 'The about field is required and must be a non-empty string',
          },
        },
        { status: 400 }
      );
    }

    // Validate duration - must be a positive number
    if (typeof duration !== 'number' || duration <= 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_DURATION',
            message: 'Invalid duration',
            reason: 'The duration must be a number greater than 0',
          },
        },
        { status: 400 }
      );
    }

    // Validate arrays
    if (!Array.isArray(instructions) || instructions.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_INSTRUCTIONS',
            message: 'Invalid instructions',
            reason: 'Instructions must be a non-empty array of strings',
          },
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(benefits) || benefits.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_BENEFITS',
            message: 'Invalid benefits',
            reason: 'Benefits must be a non-empty array of strings',
          },
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(cautions) || cautions.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_CAUTIONS',
            message: 'Invalid cautions',
            reason: 'Cautions must be a non-empty array of strings',
          },
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_IMAGES',
            message: 'Invalid images',
            reason: 'Images must be a non-empty array of URLs',
          },
        },
        { status: 400 }
      );
    }

    // Validate image URLs
    const invalidImages = images.filter((img) => !isValidUrl(img));
    if (invalidImages.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_IMAGE_URLS',
            message: 'Invalid image URLs',
            reason: `The following images are not valid URLs: ${invalidImages.join(', ')}`,
          },
        },
        { status: 400 }
      );
    }

    // Validate video URL
    if (!video || typeof video !== 'string' || !isValidUrl(video)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_VIDEO',
            message: 'Invalid video URL',
            reason: 'The video field must be a valid URL',
          },
        },
        { status: 400 }
      );
    }

    // Validate patients array (optional)
    let processedPatients = [];
    if (patients && Array.isArray(patients)) {
      processedPatients = patients.map((id) => ({
        patient: new mongoose.Types.ObjectId(id),
        isActive: true,
        assignedAt: new Date(),
      }));
    }

    // Create new workout
    const newWorkout = await Workout.create({
      patients: processedPatients,
      name: name.trim(),
      type,
      difficulty,
      duration,
      about: about.trim(),
      instructions,
      benefits,
      cautions,
      images,
      video,
    });

    return NextResponse.json(
      {
        ok: true,
        data: newWorkout,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating workout:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while creating the workout',
          reason: 'Please try again later or contact support if the issue persists',
        },
      },
      { status: 500 }
    );
  }
}
