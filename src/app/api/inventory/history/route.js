import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';

// @route    GET /api/inventory/history
// @desc     Get all inventory history from a single item
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'productId requerido' },
        { status: 400 }
      );
    }

    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      return NextResponse.json(
        { error: 'No existe inventario para ese producto' },
        { status: 404 }
      );
    }

    const history = await Transaction.find({ inventory: inventory._id })
      .populate('performedBy', 'fullName email')
      .populate('patient', 'fullName email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ history });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error al obtener el historial' },
      { status: 500 }
    );
  }
}
