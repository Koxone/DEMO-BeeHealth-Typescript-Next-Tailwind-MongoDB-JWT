export interface CurrentUserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  specialty?: string;
  hasRecord?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
