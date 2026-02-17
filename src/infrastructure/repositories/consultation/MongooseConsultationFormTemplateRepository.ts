import { UserSpecialty } from '@/domain/enums/';
import { ConsultationTemplateRepository } from '@/domain/repositories/consultation/ConsultationTemplateRepository';
import { ConsultationTemplateModel } from '@/infrastructure/database/models/consultation/ConsultationTemplateSchema';
import { connectDB } from '@/infrastructure/database/mongodb';

export class MongooseConsultationTemplateRepository implements ConsultationTemplateRepository {
  async getTemplateBySpecialty(specialty: UserSpecialty): Promise<any | null> {
    await connectDB();

    // Normalización crítica para evitar el 404 (weight -> WEIGHT)
    const specialtyUpper = specialty.toUpperCase();

    return await ConsultationTemplateModel.findOne({
      specialty: specialtyUpper,
      isActive: true,
    })
      .lean()
      .exec();
  }

  // Método faltante que causa el error de la imagen
  async listActiveTemplates(): Promise<any[]> {
    await connectDB();
    return await ConsultationTemplateModel.find({
      isActive: true,
    })
      .lean()
      .exec();
  }
}
