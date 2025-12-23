import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Custom Hook
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';

// @route    DELETE /api/consults/delete
// @desc     Cancel a consult and revert inventory
// @access   Private
export async function DELETE(req: Request) {
  try {
    // Database
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Current Logged User
    const { userId } = auth;

    // Body
    const { consultId, reason } = await req.json();

    if (!consultId) {
      return NextResponse.json({ error: 'Consult ID is required' }, { status: 400 });
    }

    // Consult
    const consult = await Consultation.findById(consultId);
    if (!consult) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    // Prevent double cancellation
    if (consult.consultStatus === 'cancelled') {
      return NextResponse.json({ error: 'Consultation already cancelled' }, { status: 400 });
    }

    // Reverse inventory
    for (const item of consult.itemsSold || []) {
      const inventory = await Inventory.findById(item.inventory);
      if (!inventory) continue;

      // Restore stock
      inventory.quantity += item.quantity;
      await inventory.save();

      // Transaction Normalization for ObjectId type
      const performedById = new mongoose.Types.ObjectId(userId);
      const patientId =
        consult.patient instanceof mongoose.Types.ObjectId ? consult.patient : consult.patient._id;
      const inventoryId = inventory._id as mongoose.Types.ObjectId;

      // Register reverse transaction
      await Transaction.create({
        inventory: inventoryId,
        movement: 'IN',
        reasonType: 'cancellation',
        quantity: item.quantity,
        reason: reason,
        performedBy: performedById,
        patient: patientId,
      });
    }

    // Update consult status
    consult.consultStatus = 'cancelled';
    await consult.save();

    return NextResponse.json({
      success: true,
      message: 'Consultation cancelled and inventory restored successfully',
    });
  } catch (error) {
    console.error('Error cancelling consultation:', error);

    return NextResponse.json({ error: 'Error cancelling consultation' }, { status: 500 });
  }
}
