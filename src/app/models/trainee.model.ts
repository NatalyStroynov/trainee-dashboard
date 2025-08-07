export interface Trainee {
  id: string;
  name: string;
  subject: string;
  grade: number;
  date: Date;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
}
