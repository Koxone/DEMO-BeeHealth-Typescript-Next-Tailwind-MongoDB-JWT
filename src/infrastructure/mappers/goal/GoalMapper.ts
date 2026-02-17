import { Goal } from '@/domain/entities/goal/Goal';
import { UserSpecialty, GoalStatusEnum } from '@/domain/enums/';

export class GoalMapper {
  public static toDomain(raw: any): Goal {
    return Goal.fromPersistence({
      id: raw._id.toString(),
      patientId: raw.patientId.toString(),
      consultationId: raw.consultationId.toString(),
      specialty: raw.specialty as UserSpecialty,
      initialValue: raw.initialValue,
      targetValue: raw.targetValue,
      finalValue: raw.finalValue,
      status: raw.status as GoalStatusEnum,
      notes: raw.notes,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    });
  }

  public static toPersistence(domain: Goal) {
    const data = domain.toPersistence();
    return {
      ...(domain.getId() && { _id: domain.getId() }),
      ...data,
    };
  }
}
