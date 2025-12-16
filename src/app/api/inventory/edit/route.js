import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// @route    PATCH /api/inventory/edit
// @desc     Edit product name, category, quantity, stock and prices - Single transaction
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();
    const {
      inventoryId,
      name,
      category,
      quantity,
      costPrice,
      salePrice,
      reason,
      minStock,
      maxStock,
    } = body;

    // Extract token
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

    const userId = decoded.id;

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

    // Save previous values
    const previousQuantity = inventoryItem.quantity;
    const previousMinStock = inventoryItem.minStock;
    const previousMaxStock = inventoryItem.maxStock;
    const oldName = productItem.name;
    const oldCategory = productItem.category;
    const oldCostPrice = productItem.costPrice;
    const oldSalePrice = productItem.salePrice;

    const changedFields = [];
    const transactionData = {
      inventory: inventoryItem._id,
      reasonType: 'correction',
      performedBy: new mongoose.Types.ObjectId(userId),
      reason: reason || 'Inventory update',
    };

    // === UPDATE PRODUCT FIELDS ===
    if (name !== undefined && name !== oldName) {
      productItem.name = name;
      transactionData.oldName = oldName;
      transactionData.newName = name;
      changedFields.push('name');
    }

    if (category !== undefined && category !== oldCategory) {
      productItem.category = category;
      transactionData.oldCategory = oldCategory;
      transactionData.newCategory = category;
      changedFields.push('category');
    }

    if (costPrice !== undefined && Number(costPrice) !== oldCostPrice) {
      productItem.costPrice = Number(costPrice);
      transactionData.oldCostPrice = oldCostPrice;
      transactionData.newCostPrice = Number(costPrice);
      changedFields.push('costPrice');
    }

    if (salePrice !== undefined && Number(salePrice) !== oldSalePrice) {
      productItem.salePrice = Number(salePrice);
      transactionData.oldSalePrice = oldSalePrice;
      transactionData.newSalePrice = Number(salePrice);
      changedFields.push('salePrice');
    }

    await productItem.save();

    // === UPDATE INVENTORY FIELDS ===
    if (quantity !== undefined && quantity !== previousQuantity) {
      inventoryItem.quantity = Number(quantity);
      transactionData.oldQuantity = previousQuantity;
      transactionData.newQuantity = Number(quantity);
      transactionData.quantityDelta = Math.abs(Number(quantity) - previousQuantity);
      changedFields.push('quantity');

      // Determine movement for quantity
      const delta = Number(quantity) - previousQuantity;
      transactionData.movement = delta > 0 ? 'IN' : 'OUT';
    }

    if (minStock !== undefined && minStock !== previousMinStock) {
      inventoryItem.minStock = Number(minStock);
      transactionData.oldMinStock = previousMinStock;
      transactionData.newMinStock = Number(minStock);
      changedFields.push('minStock');
    }

    if (maxStock !== undefined && maxStock !== previousMaxStock) {
      inventoryItem.maxStock = Number(maxStock);
      transactionData.oldMaxStock = previousMaxStock;
      transactionData.newMaxStock = Number(maxStock);
      changedFields.push('maxStock');
    }

    await inventoryItem.save();

    // === DETERMINE ACTION TYPE ===
    let actionType = 'inventory-edit';

    if (changedFields.length === 0) {
      return NextResponse.json({ success: false, error: 'No changes were made' }, { status: 400 });
    }

    // Set action type based on what changed
    const hasQuantityOrStock = changedFields.some((f) =>
      ['quantity', 'minStock', 'maxStock'].includes(f)
    );
    const hasPriceOrInfo = changedFields.some((f) =>
      ['costPrice', 'salePrice', 'name', 'category'].includes(f)
    );

    if (hasQuantityOrStock && !hasPriceOrInfo) {
      actionType = changedFields.includes('quantity') ? 'quantity-edit' : 'stock-edit';
    } else if (hasPriceOrInfo && !hasQuantityOrStock) {
      actionType = 'product-edit';
    }

    // Determine movement for prices if not already set
    if (
      !transactionData.movement &&
      (changedFields.includes('costPrice') || changedFields.includes('salePrice'))
    ) {
      const newCostPrice = costPrice !== undefined ? Number(costPrice) : oldCostPrice;
      const newSalePrice = salePrice !== undefined ? Number(salePrice) : oldSalePrice;

      if (newCostPrice > oldCostPrice || newSalePrice > oldSalePrice) {
        transactionData.movement = 'IN';
      } else if (newCostPrice < oldCostPrice || newSalePrice < oldSalePrice) {
        transactionData.movement = 'OUT';
      }
    }

    transactionData.actionType = actionType;
    transactionData.changedFields = changedFields;

    // === CREATE SINGLE TRANSACTION ===
    await Transaction.create(transactionData);

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
