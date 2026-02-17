// Domain Entity
import { Consultation } from '@/domain/entities/consultation/Consultation';

// Repository Interface
import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';

// Value Objects
import { ConsultationAnswer } from '@/domain/value-objects/consultation/ConsultationAnswer';

// Enums
import { QuestionType, UserSpecialty } from '@/domain/enums/';

// DB
import mongoose from 'mongoose';
import { connectDB } from '@/infrastructure/database/mongodb';
import { ConsultationModel } from '@/infrastructure/database/models/consultation/ConsultationModel';

type AnswerLean = {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
};

type ConsultationLean = {
  _id: mongoose.Types.ObjectId;
  patientId: string;
  specialty: UserSpecialty;
  answers: AnswerLean[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Mongoose implementation of the Consultation repository.
 * Handles persistence logic for clinical consultations and history.
 */
export class MongooseConsultationRepository implements ConsultationRepository {
  /**
   * Retrieves a specific consultation by its database identifier.
   * @param id The unique consultation ID.
   * @returns A promise that resolves to the Consultation entity or null if not found.
   */
  async findById(id: string): Promise<Consultation | null> {
    await connectDB();

    const document = await ConsultationModel.findById(id).lean<ConsultationLean>().exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  /**
   * Retrieves all consultations associated with a specific patient.
   * @param patientId The unique identifier of the patient.
   * @returns A promise that resolves to an array of Consultation entities.
   */
  async findByPatientId(patientId: string): Promise<Consultation[]> {
    await connectDB();

    const documents = await ConsultationModel.find({ patientId }).lean<ConsultationLean[]>().exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  /**
   * Alias for findByPatientId. Retrieves the full history of a patient.
   * @param patientId The unique identifier of the patient.
   * @returns A promise that resolves to an array of Consultation entities.
   */
  async findAllByPatientId(patientId: string): Promise<Consultation[]> {
    return this.findByPatientId(patientId);
  }

  /**
   * Retrieves a single consultation record for a patient within a specific specialty.
   * @param patientId The unique identifier of the patient.
   * @param specialty The medical specialty filter.
   * @returns A promise that resolves to the Consultation entity or null if not found.
   */
  async findByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation | null> {
    await connectDB();

    const document = await ConsultationModel.findOne({ patientId, specialty })
      .lean<ConsultationLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  /**
   * Verifies if there is at least one consultation recorded for a patient in a given specialty.
   * @param patientId The unique identifier of the patient.
   * @param specialty The medical specialty to check.
   * @returns A promise that resolves to true if a record exists, otherwise false.
   */
  async exists(patientId: string, specialty: UserSpecialty): Promise<boolean> {
    await connectDB();

    const count = await ConsultationModel.countDocuments({
      patientId,
      specialty,
    }).exec();

    return count > 0;
  }

  /**
   * Persists a new consultation or updates an existing one in the database.
   * @param consultation The Consultation domain entity to save.
   * @returns A promise that resolves to the saved Consultation entity.
   */
  async save(consultation: Consultation): Promise<Consultation> {
    await connectDB();

    const persistence = consultation.toPersistence();

    const created = await ConsultationModel.create(persistence);

    return this.mapToDomain(created.toObject() as ConsultationLean);
  }

  /**
   * Specialized method to persist weight-related history records.
   * @param history The Consultation entity containing weight data.
   * @returns A promise that resolves when the operation is complete.
   */
  async saveWeightHistory(history: Consultation): Promise<void> {
    await connectDB();

    const persistence = history.toPersistence();

    await ConsultationModel.create(persistence);
  }

  /**
   * Retrieves the specific weight history record for a patient.
   * @param patientId The unique identifier of the patient.
   * @returns A promise that resolves to the Consultation entity or null if not found.
   */
  async getWeightHistoryByPatientId(patientId: string): Promise<Consultation | null> {
    await connectDB();

    const document = await ConsultationModel.findOne({
      patientId,
      specialty: UserSpecialty.WEIGHT,
    })
      .lean<ConsultationLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  /**
   * Retrieves all consultation records for a patient filtered by specialty, sorted by date.
   * @param patientId The unique identifier of the patient.
   * @param specialty The medical specialty filter.
   * @returns A promise that resolves to an array of Consultation entities.
   */
  async findAllByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation[]> {
    await connectDB();

    const documents = await ConsultationModel.find({ patientId, specialty })
      .sort({ createdAt: -1 })
      .lean<ConsultationLean[]>()
      .exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  /**
   * Retrieves the most recent consultation record for a specific patient and specialty.
   * @param patientId The unique identifier of the patient.
   * @param specialty The medical specialty filter.
   * @returns A promise that resolves to the latest Consultation entity or null if not found.
   */
  async findLatestByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation | null> {
    await connectDB();

    const document = await ConsultationModel.findOne({ patientId, specialty })
      .sort({ updatedAt: -1, _id: -1 })
      .lean<ConsultationLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  /**
   * Counts the total number of consultations recorded for a specific patient.
   * @param patientId The unique identifier of the patient.
   * @returns A promise that resolves to the total count of consultations.
   */
  async countByPatientId(patientId: string): Promise<number> {
    await connectDB();

    const count = await ConsultationModel.countDocuments({ patientId }).exec();

    return count;
  }

  /**
   * Maps a database lean document to a Domain Entity.
   * @param document The persistence layer document.
   * @returns A Domain Consultation entity.
   * @private
   */
  private mapToDomain(document: ConsultationLean): Consultation {
    const answers = document.answers.map((a) =>
      ConsultationAnswer.create({
        questionId: a.questionId,
        questionText: a.questionText,
        questionType: a.questionType as QuestionType,
        value: a.value,
      })
    );

    return Consultation.fromPersistence({
      id: document._id.toString(),
      patientId: document.patientId,
      specialty: document.specialty as UserSpecialty,
      answers,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
