import { UserSpecialty } from '@/domain/enums/';

export interface ConsultationTemplateRepository {
  getTemplateBySpecialty(specialty: UserSpecialty): Promise<any | null>;

  listActiveTemplates(): Promise<any[]>;
}
