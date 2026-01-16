export interface IClinicalRecord {
  _id: string;
  patient: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  doctor: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  specialty: string;
  version: string;
  answers: { [key: string]: any };
  createdAt: string;
  updatedAt: string;
  recordDate: Date;
  __v?: number;
}

export interface IClinicalRecordResponse {
  data: IClinicalRecord[];
}
