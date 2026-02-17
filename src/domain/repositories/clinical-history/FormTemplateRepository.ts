import { UserSpecialty } from "@/domain/enums/UserSpecialty";

export interface FormTemplateRepository {
  getTemplateBySpecialty(specialty: UserSpecialty): Promise<any | null>;

  listActiveTemplates(): Promise<any[]>;
}
