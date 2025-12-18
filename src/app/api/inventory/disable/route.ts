import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/inventory/disable
// @desc     Disable an inventory item
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();
    const { inventoryId, productId, reason, inStock } = body;

    // Auth
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    const { userId } = auth;

    // Validate inventory ID
    if (!inventoryId) {
      return NextResponse.json({ error: 'Inventory ID is required' }, { status: 400 });
    }

    // Find inventory and linked product
    const inventoryItem = await Inventory.findById(inventoryId).populate('product');
    if (!inventoryItem) {
      return NextResponse.json({ error: 'Inventory item not found' }, { status: 404 });
    }

    // Find product item
    const productItem = await Product.findById(inventoryItem.product._id);
    if (!productItem) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update editable product fields
    if (inStock !== undefined) productItem.inStock = inStock;

    await productItem.save();

    // Log correction transaction
    await Transaction.create({
      inventory: inventoryItem._id,
      reasonType: 'status_change',
      movement: inStock ? 'IN' : 'OUT',
      performedBy: new mongoose.Types.ObjectId(userId),
      reason: reason || 'Cambio de estado del producto en el inventario',
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully',
        inventory: { ...inventoryItem.toObject(), product: productItem },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json({ error: 'Server error while updating inventory' }, { status: 500 });
  }
}
