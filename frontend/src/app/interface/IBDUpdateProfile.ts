import { ERole } from './Enum';

export interface IBDUpdateProfile {
  fullName: string;
  dateOfBirth: Date;
  phone: string;
}

export interface IBDProfile {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  phone: string;
  ERole: ERole;
}

export interface IBDCreate {
  email: string;
  password: string;
  firstName: string;
  ERole: ERole;
}
