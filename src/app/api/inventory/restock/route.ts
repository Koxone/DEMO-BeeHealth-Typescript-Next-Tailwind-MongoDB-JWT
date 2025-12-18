import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

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

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

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
