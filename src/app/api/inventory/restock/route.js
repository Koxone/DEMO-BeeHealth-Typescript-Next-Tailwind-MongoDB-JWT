import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';

// @route    PATCH /api/inventory/restock
// @desc     Restock an inventory item
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to DB
    await connectDB();
    // Parse request body
    const body = await req.json();

    // Validate input
    const { inventoryId, quantity, reason, performedBy } = body;
    const parsedQuantity = Number(quantity);

    if (!inventoryId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json(
        { error: 'Datos inválidos: se requiere un ID de inventario y una cantidad positiva.' },
        { status: 400 }
      );
    }

    // Get token from cookies or Authorization header
    const refreshToken = req.cookies?.get('refreshToken')?.value || null;
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = bearerToken || refreshToken;

    if (!token) {
      return NextResponse.json({ error: 'No autorizado. Token ausente.' }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Token inválido o expirado.' }, { status: 401 });
    }

    const userId = decoded.id;

    // Find inventory item
    const inventoryItem = await Inventory.findById(inventoryId);
    if (!inventoryItem) {
      return NextResponse.json({ error: 'Elemento de inventario no encontrado.' }, { status: 404 });
    }
    // Update inventory quantity
    inventoryItem.quantity += parsedQuantity;
    await inventoryItem.save();

    // Log transaction
    const newTransaction = await Transaction.create({
      inventory: inventoryItem._id,
      movement: 'IN',
      reasonType: 'restock',
      performedBy: new mongoose.Types.ObjectId(userId),
      quantity: parsedQuantity,
      reason: reason || 'Reabastecimiento de inventario',
    });

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: 'Stock actualizado correctamente',
        inventory: inventoryItem,
        transaction: newTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reabasteciendo inventario:', error);
    return NextResponse.json(
      { error: 'Error del servidor al reabastecer el inventario.' },
      { status: 500 }
    );
  }
}
