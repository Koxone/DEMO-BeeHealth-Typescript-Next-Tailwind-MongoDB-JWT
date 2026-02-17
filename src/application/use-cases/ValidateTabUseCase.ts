import { Tab, TabName } from '@/presentation/types/';

export class ValidateTabUseCase {
  execute(requestedTab: string | null, validTabs: readonly Tab[]): TabName {
    const isValid = validTabs.some((t) => t.name === requestedTab);
    return isValid ? (requestedTab as TabName) : 'Consultas';
  }
}
