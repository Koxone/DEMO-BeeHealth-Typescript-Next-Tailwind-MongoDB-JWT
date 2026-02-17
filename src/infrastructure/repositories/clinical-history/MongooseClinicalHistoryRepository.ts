// Domain Entity
import { WeightClinicalHistory } from '@/domain/entities/clinical-history/WeightClinicalHistory';

// Repository Interface
import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';

// Value Objects
import { ClinicalAnswer } from '@/domain/value-objects/clinical-history/ClinicalAnswer';

// Enums
import { QuestionType, UserSpecialty } from '@/domain/enums/';

// DB
import mongoose from 'mongoose';
import { connectDB } from '@/infrastructure/database/mongodb';
import { WeightClinicalHistoryModel } from '@/infrastructure/database/models/clinical-history/WeightClinicalHistoryModel';

type AnswerLean = {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
};

type ClinicalHistoryLean = {
  _id: mongoose.Types.ObjectId;
  patientId: string;
  specialty: UserSpecialty;
  answers: AnswerLean[];
  createdAt: Date;
  updatedAt: Date;
};

export class MongooseClinicalHistoryRepository implements ClinicalHistoryRepository {
  async findById(id: string): Promise<WeightClinicalHistory | null> {
    await connectDB();

    const document = await WeightClinicalHistoryModel.findById(id)
      .lean<ClinicalHistoryLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  async findByPatientId(patientId: string): Promise<WeightClinicalHistory[]> {
    await connectDB();

    const documents = await WeightClinicalHistoryModel.find({ patientId })
      .lean<ClinicalHistoryLean[]>()
      .exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  async findAllByPatientId(patientId: string): Promise<WeightClinicalHistory[]> {
    return this.findByPatientId(patientId);
  }

  async findByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<WeightClinicalHistory | null> {
    await connectDB();

    const document = await WeightClinicalHistoryModel.findOne({ patientId, specialty })
      .lean<ClinicalHistoryLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  async exists(patientId: string, specialty: UserSpecialty): Promise<boolean> {
    await connectDB();

    const count = await WeightClinicalHistoryModel.countDocuments({
      patientId,
      specialty,
    }).exec();

    return count > 0;
  }

  async save(clinicalHistory: WeightClinicalHistory): Promise<WeightClinicalHistory> {
    await connectDB();

    const persistence = clinicalHistory.toPersistence();

    const created = await WeightClinicalHistoryModel.create(persistence);

    return this.mapToDomain(created.toObject() as ClinicalHistoryLean);
  }

  async saveWeightHistory(history: WeightClinicalHistory): Promise<void> {
    await connectDB();

    const persistence = history.toPersistence();

    await WeightClinicalHistoryModel.create(persistence);
  }

  async getWeightHistoryByPatientId(patientId: string): Promise<WeightClinicalHistory | null> {
    await connectDB();

    const document = await WeightClinicalHistoryModel.findOne({
      patientId,
      specialty: UserSpecialty.WEIGHT,
    })
      .lean<ClinicalHistoryLean>()
      .exec();

    if (!document) return null;

    return this.mapToDomain(document);
  }

  // Mapper
  private mapToDomain(document: ClinicalHistoryLean): WeightClinicalHistory {
    const answers = document.answers.map((a) =>
      ClinicalAnswer.create({
        questionId: a.questionId,
        questionText: a.questionText,
        questionType: a.questionType as QuestionType,
        value: a.value,
      })
    );

    return WeightClinicalHistory.fromPersistence({
      id: document._id.toString(),
      patientId: document.patientId,
      specialty: document.specialty as UserSpecialty,
      answers,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
