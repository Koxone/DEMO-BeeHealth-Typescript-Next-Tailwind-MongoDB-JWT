import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';

// @route    GET /api/inventory
// @desc     Get all inventory items
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    const inventoryItems = await Inventory.find().populate('product').lean();

    return NextResponse.json(inventoryItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
