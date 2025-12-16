import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';

// @route    POST /api/products/types
// @desc     Get products by types
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    const products = await Product.find({ type: 'medicamento' })
      .populate({ path: 'inventory', select: '_id quantity' })
      .lean();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
