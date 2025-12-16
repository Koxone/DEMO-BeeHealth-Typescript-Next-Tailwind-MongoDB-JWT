import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Diet from '@/models/Diet';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Objects helper
function updateSection(target, source) {
  if (!source) return;
  if (Array.isArray(source.items)) target.items = source.items;
  if (source.note !== undefined) target.note = source.note;
}

// @route    PATCH /api/diets/:id/edit
// @desc     Edit a diet
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    // params fix
    const { id } = await params;

    const body = await req.json();
    const {
      name,
      category,
      description,
      benefits,
      instructions,
      ingredients,

      allowedFoods,
      allowedLiquids,
      forbiddenFoods,
      forbiddenLiquids,

      duration,
      notes,
      images,
      isActive,
      patients,
    } = body;

    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Get auth user
    const { user } = auth;

    // Get specialty
    const specialty = user.specialty || 'weight';
    if (!specialty) {
      return NextResponse.json({ error: 'Specialty not found' }, { status: 400 });
    }

    // Find diet
    const diet = await Diet.findById(id);
    if (!diet) {
      return NextResponse.json({ error: 'Diet not found' }, { status: 404 });
    }

    // Update diet fields
    diet.name = name ?? diet.name;
    diet.category = category ?? diet.category;
    diet.description = description ?? diet.description;
    diet.benefits = benefits ?? diet.benefits;
    diet.instructions = instructions ?? diet.instructions;

    if (Array.isArray(ingredients)) diet.ingredients = ingredients;
    if (Array.isArray(images)) diet.images = images;

    if (Array.isArray(patients)) {
      diet.patients = patients
        .map((p) => {
          if (typeof p === 'string') {
            return { patient: p };
          }

          if (p.patient) {
            return { patient: p.patient };
          }

          return null;
        })
        .filter(Boolean);
    }

    updateSection(diet.allowedFoods, allowedFoods);
    updateSection(diet.allowedLiquids, allowedLiquids);
    updateSection(diet.forbiddenFoods, forbiddenFoods);
    updateSection(diet.forbiddenLiquids, forbiddenLiquids);

    diet.duration = duration ?? diet.duration;
    diet.notes = notes ?? diet.notes;
    diet.isActive = typeof isActive === 'boolean' ? isActive : diet.isActive;

    // Save updated diet
    await diet.save();

    return NextResponse.json({ message: 'Diet updated successfully', diet }, { status: 200 });
  } catch (error) {
    console.error('Error updating diet:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
