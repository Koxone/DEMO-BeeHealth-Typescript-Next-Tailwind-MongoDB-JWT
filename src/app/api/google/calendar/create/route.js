import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';
import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Appointment from '@/models/Appointment';

// @route    POST /api/google/calendar/create
// @desc     Create a calendar event
// @access   Private
export async function POST(req) {
  try {
    /* Parse body */
    const body = await req.json();
    const { patientId, patientName, specialty, date, time, phone, email, reason } = body;

    /* Auth */
    const auth = getGoogleOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    /* Calendar selection */
    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    /* Dates */
    const startDateTime = new Date(`${date}T${time}:00-06:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    /* Event payload */
    const summary = specialty === 'weight' ? 'Control de peso' : 'Odontología';
    const description = `
Paciente: ${patientName || ''}
Paciente ID: ${patientId || ''}
Motivo de consulta: ${reason || ''}
Teléfono: ${phone || ''}
Correo: ${email || ''}
Fecha: ${date || ''}
Hora: ${time || ''}
Especialidad: ${specialty || ''}
    `.trim();

    const event = {
      summary,
      description,
      start: { dateTime: startDateTime.toISOString(), timeZone: 'America/Mexico_City' },
      end: { dateTime: endDateTime.toISOString(), timeZone: 'America/Mexico_City' },
      // attendees removed — service accounts cannot invite people
    };

    /* Insert */
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    await connectDB();

    /* Create appointment document */
    await Appointment.create({
      patient: patientId,
      name: patientName,
      specialty,
      date,
      time,
      reason,
      phone,
      email,
      googleEventId: response.data.id,
      googleCalendarId: calendarId,
    });

    /* Ok */
    return Response.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error creating event:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
