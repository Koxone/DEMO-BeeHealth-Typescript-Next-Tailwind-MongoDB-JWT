import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import Inventory from '@/models/Inventory';

// @route    PATCH /api/inventory/edit/quantity
// @desc     Edit the quantity of a product in the inventory
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to DB
    await connectDB();

    // Get data from request
    const { productId, quantity, reason } = await req.json();
    if (!productId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'PRODUCT_ID_REQUIRED',
            message: 'Product ID is required',
            reason: 'The request did not include a valid productId field',
          },
        },
        { status: 400 }
      );
    }

    // Authenticate User
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: auth.error,
        },
        { status: auth.status }
      );
    }
    const { userId, specialty } = auth;

    // Find product item
    const productItem = await Product.findById(productId);
    if (!productItem) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'PRODUCT_NOT_FOUND',
            message: 'Product not found',
            product: productId,
            reason:
              'The product ID provided does not correspond to any existing product or is missing.',
          },
        },
        { status: 404 }
      );
    }

    // Get inventory ID
    const inventoryId = productItem.inventory;
    if (!inventoryId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVENTORY_ID_REQUIRED',
            message: 'Inventory ID is required',
            reason: 'The product does not have an associated inventory ID',
          },
        },
        { status: 400 }
      );
    }

    // Find inventory item
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVENTORY_NOT_FOUND',
            message: 'Inventory not found',
            inventory: inventoryId,
            reason:
              'The inventory ID associated with the product does not correspond to any existing inventory or is missing.',
          },
        },
        { status: 404 }
      );
    }

    // Save old values before updating
    const oldQuantity = inventory.quantity;

    // Update inventory fields
    if (quantity !== undefined) inventory.quantity = quantity;

    // Save updated product
    await inventory.save();

    // Only create transaction if something changed
    const changes = {
      inventory: inventory._id,
      movement: quantity > oldQuantity ? 'IN' : quantity < oldQuantity ? 'OUT' : 'PRODUCT_UPDATE',
      reasonType: 'correction',
      performedBy: new mongoose.Types.ObjectId(userId),
      reason: reason || 'Correccion de cantidad',
      oldQuantity,
      newQuantity: inventory.quantity,
      quantityDelta: quantity - oldQuantity,
      changedFields: [],
    };

    if (oldQuantity !== inventory.quantity) {
      changes.changedFields.push('quantity');
      await Transaction.create(changes);
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Cantidad actualizada correctamente',
        product: productItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating quantity:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while updating the quantity',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
