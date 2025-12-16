import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  name: string;
  specialty: 'weight' | 'dental';
  date: string;
  time: string;
  reason: string;
  phone: string;
  email: string;
  googleEventId: string;
  googleCalendarId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },

    name: {
      type: String,
      required: true,
    },

    specialty: {
      type: String,
      enum: ['weight', 'dental'],
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: false,
      default: '',
    },

    phone: {
      type: String,
      required: false,
      default: '',
    },

    email: {
      type: String,
      required: false,
      default: '',
    },

    googleEventId: {
      type: String,
      required: true,
    },

    googleCalendarId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = models.Appointment || model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
