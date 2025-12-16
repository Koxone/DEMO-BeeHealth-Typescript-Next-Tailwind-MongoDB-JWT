import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// @route    POST /api/inventory/create
// @desc     Create a new inventory item
// @access   Private
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Extract token from cookie or authorization header
    const cookieHeader = req.headers.get('cookie') || '';
    const refreshToken =
      cookieHeader
        .split('; ')
        .find((c) => c.startsWith('refreshToken='))
        ?.split('=')[1] || null;

    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    const token = bearerToken || refreshToken;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Get user ID from decoded token
    const userId = decoded.id;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // Get user's specialty
    const specialty = body.specialty || user?.specialty || 'weight';

    const quantity = Number(body.quantity);
    if (!body.name || isNaN(quantity)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const validTypes = ['medicamento', 'receta', 'suministro'];
    const normalizedType =
      typeof body.type === 'string' && validTypes.includes(body.type.toLowerCase())
        ? body.type.toLowerCase()
        : 'medicamento';

    const newProduct = await Product.create({
      name: body.name,
      type: normalizedType,
      category: body.category || 'General',
      inStock: body.inStock ?? true,
      specialty: specialty,
      costPrice: body.costPrice ?? 0,
      salePrice: body.salePrice ?? 0,
    });

    const newInventory = await Inventory.create({
      product: newProduct._id,
      productType: newProduct.type,
      quantity,
      minStock: body.minStock ?? 0,
      maxStock: body.maxStock ?? 0,
    });

    newProduct.inventory = newInventory._id;
    await newProduct.save();

    const newTransaction = await Transaction.create({
      inventory: newInventory._id,
      movement: 'IN',
      performedBy: new mongoose.Types.ObjectId(userId),
      reasonType: 'initial',
      quantity,
      reason: 'Initial stock',
    });

    return NextResponse.json(
      {
        message: 'Producto agregado correctamente',
        product: newProduct,
        inventory: newInventory,
        transaction: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
