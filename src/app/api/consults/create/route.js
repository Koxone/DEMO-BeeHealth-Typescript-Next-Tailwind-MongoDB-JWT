import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';
import User from '@/models/User';

// @route    POST /api/inventory/create
// @desc     Create a new consultation with inventory management
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    // Auth
    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { userId } = auth;

    // Body
    const {
      patient,
      employee,
      consultType,
      speciality,
      consultPrice,
      itemsSold,
      paymentMethod,
      notes,
    } = await req.json();

    // Validate required fields
    if (
      !patient ||
      !consultType ||
      consultPrice == null ||
      !paymentMethod ||
      !itemsSold ||
      itemsSold.length === 0
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    if (!['efectivo', 'tarjeta', 'transferencia'].includes(paymentMethod)) {
      return NextResponse.json({ error: 'Método de pago inválido' }, { status: 400 });
    }

    // Validate users exist
    const patientExists = await User.findById(patient);
    if (!patientExists) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    }

    const employeeId = employee || userId;
    const employeeExists = await User.findById(employeeId);
    if (!employeeExists) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    // Validate & process items
    let totalCost = 0;
    const processedItems = [];

    for (const sold of itemsSold) {
      const { inventory: inventoryId, product: productId, quantity, price } = sold;

      // Validate structure
      if (!inventoryId || !productId || !quantity || price == null) {
        return NextResponse.json({ error: 'Estructura de items inválida' }, { status: 400 });
      }

      // Validate inventory exists
      const inv = await Inventory.findById(inventoryId).populate('product');
      if (!inv) {
        return NextResponse.json(
          { error: `Inventario ${inventoryId} no encontrado` },
          { status: 404 }
        );
      }

      // Prevent negative stock
      if (inv.quantity < quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${inv.product?.name}. Disponible: ${inv.quantity}` },
          { status: 400 }
        );
      }

      // Calculate item total
      const itemTotal = price * quantity;
      totalCost += itemTotal;

      processedItems.push({
        inventory: inventoryId,
        product: productId,
        quantity,
        price,
        total: itemTotal,
      });
    }

    // Create consultation
    const consultation = await Consultation.create({
      patient,
      employee: employeeId,
      consultType,
      speciality: speciality || 'none',
      consultPrice,
      totalItemsSold: totalCost,
      totalCost: consultPrice + totalCost,
      itemsSold: processedItems,
      paymentMethod,
      transaction: [],
      notes,
    });

    // Process inventory & create transactions
    const transactionIds = [];

    for (const item of processedItems) {
      try {
        const inv = await Inventory.findById(item.inventory);

        // Decrease inventory
        inv.quantity -= item.quantity;
        await inv.save();

        // Create transaction OUT
        const newTransaction = await Transaction.create({
          inventory: inv._id,
          movement: 'OUT',
          quantity: item.quantity,
          reasonType: 'sale',
          reason: `Venta en consulta - ${consultType}`,
          performedBy: new mongoose.Types.ObjectId(userId),
          patient: new mongoose.Types.ObjectId(patient),
        });

        transactionIds.push(newTransaction._id);
      } catch (itemError) {
        console.error('Error processing item:', itemError);
        // Aquí podrías implementar rollback si lo necesitas
        throw new Error(`Error procesando item: ${itemError.message}`);
      }
    }

    // Update consultation with transactions
    consultation.transaction = transactionIds;
    await consultation.save();

    return NextResponse.json(
      {
        success: true,
        consultation,
        message: `Consulta creada exitosamente con ${transactionIds.length} movimientos de inventario`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear la consulta' },
      { status: 500 }
    );
  }
}
