import { UserSpecialty } from '@/domain/enums/';
import { FormTemplateRepository } from '@/domain/repositories/clinical-history/FormTemplateRepository';
import { ClinicalTemplateModel } from '@/infrastructure/database/models/clinical-history/ClinicalHistoryTemplateSchema';
import { connectDB } from '@/infrastructure/database/mongodb';

export class MongooseFormTemplateRepository implements FormTemplateRepository {
  async getTemplateBySpecialty(specialty: UserSpecialty): Promise<any | null> {
    await connectDB();
    return await ClinicalTemplateModel.findOne({
      specialty: specialty as any,
      isActive: true as any,
    })
      .lean()
      .exec();
  }

  async listActiveTemplates(): Promise<any[]> {
    await connectDB();
    return await ClinicalTemplateModel.find({
      isActive: true as any,
    })
      .lean()
      .exec();
  }
}
