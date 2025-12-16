import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/inventory/edit/product
// @desc     Edit a product in the inventory
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to DB
    await connectDB();

    // Get data from request
    const { productId, name, type, category, costPrice, salePrice, reason } = await req.json();
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
    const { userId, specialty } = auth;

    // Save old values before updating
    const oldName = productItem.name;
    const oldType = productItem.type;
    const oldCategory = productItem.category;
    const oldSpecialty = productItem.specialty;
    const oldCostPrice = productItem.costPrice;
    const oldSalePrice = productItem.salePrice;

    // Update product fields
    if (name) productItem.name = name;
    if (type) productItem.type = type;
    if (category) productItem.category = category;
    productItem.specialty = specialty;
    if (costPrice !== undefined) productItem.costPrice = costPrice;
    if (salePrice !== undefined) productItem.salePrice = salePrice;

    // Save updated product
    await productItem.save();

    // Only create transaction if something changed
    const changes = {
      inventory: productItem.inventory,
      movement: 'PRODUCT_UPDATE',
      reasonType: 'correction',
      performedBy: new mongoose.Types.ObjectId(userId),
      reason: reason || 'Correccion de producto',
    };

    // Check if price fields have changed
    let priceChanged = false;
    let delta = 0;
    const changedFields = [];

    if (oldCostPrice !== productItem.costPrice) {
      changes.oldCostPrice = oldCostPrice;
      changes.newCostPrice = productItem.costPrice;
      changedFields.push('costPrice');
      priceChanged = true;
      delta = productItem.costPrice - oldCostPrice;
    }
    if (oldSalePrice !== productItem.salePrice) {
      changes.oldSalePrice = oldSalePrice;
      changes.newSalePrice = productItem.salePrice;
      changedFields.push('salePrice');
      priceChanged = true;
      const saleDelta = productItem.salePrice - oldSalePrice;
      if (Math.abs(saleDelta) > Math.abs(delta)) delta = saleDelta;
    }

    // Determine movement if price changed
    if (priceChanged) {
      changes.movement = delta > 0 ? 'IN' : 'OUT';
      changes.priceDelta = delta;
    }

    // Add changed fields dynamically
    if (oldName !== productItem.name) {
      changes.oldName = oldName;
      changes.newName = productItem.name;
      changedFields.push('name');
    }

    if (oldType !== productItem.type) {
      changes.oldType = oldType;
      changes.newType = productItem.type;
      changedFields.push('type');
    }

    if (oldCategory !== productItem.category) {
      changes.oldCategory = oldCategory;
      changes.newCategory = productItem.category;
      changedFields.push('category');
    }

    if (oldSpecialty !== productItem.specialty) {
      changes.oldSpecialty = oldSpecialty;
      changes.newSpecialty = productItem.specialty;
      changedFields.push('specialty');
    }

    // Create transaction only if there is at least one actual field change
    if (changedFields.length > 0) {
      changes.changedFields = changedFields;
      await Transaction.create(changes);
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Product updated successfully',
        product: productItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while updating the product',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
