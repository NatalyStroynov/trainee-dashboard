import { Trainee } from '../models/trainee.model';

export const MOCK_TRAINEES: Trainee[] = [
   { id: 'T001', name: 'Alice', subject: 'Math', grade: 85, date: new Date('2024-01-01') },
  { id: 'T001', name: 'Alice', subject: 'Math', grade: 82, date: new Date('2024-02-01') },
  { id: 'T001', name: 'Alice', subject: 'Math', grade: 88, date: new Date('2024-03-01') },

  { id: 'T002', name: 'Bob', subject: 'Physics', grade: 78, date: new Date('2024-01-01') },
  { id: 'T002', name: 'Bob', subject: 'Physics', grade: 75, date: new Date('2024-02-01') },
  { id: 'T002', name: 'Bob', subject: 'Physics', grade: 79, date: new Date('2024-03-01') },

  { id: 'T003', name: 'Clara', subject: 'Chemistry', grade: 90, date: new Date('2024-01-01') },
  { id: 'T003', name: 'Clara', subject: 'Chemistry', grade: 91, date: new Date('2024-02-01') },
  { id: 'T003', name: 'Clara', subject: 'Chemistry', grade: 89, date: new Date('2024-03-01') },
  ...generateMockTrainees(30, ['Math', 'Physics', 'Biology', 'Chemistry', 'History', 'English', 'Art', 'Music', 'CS', 'PE'])
];

function generateMockTrainees(count: number, subjects: string[]): Trainee[] {
  const trainees: Trainee[] = [];

  for (let i = 4; i < count + 4; i++) {
    const id = `T${i.toString().padStart(3, '0')}`;
    const name = `Trainee ${i}`;
    const subject = subjects[i % subjects.length];

    for (let m = 1; m <= 3; m++) {
      trainees.push({
        id,
        name,
        subject,
        grade: 60 + Math.round(Math.random() * 40),
        date: new Date(`2024-0${m}-01`)
      });
    }
  }

  return trainees;
}