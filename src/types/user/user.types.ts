export interface CurrentUserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  hasRecord?: boolean;
  role: string;
  avatar?: string;
  createdAt?: Date;
  specialty?: string;
}
