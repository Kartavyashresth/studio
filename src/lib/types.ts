export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  program: string;
  studentId: string;
};

export type Activity = {
  id: string;
  name: string;
  type: 'Seminar' | 'Conference' | 'MOOC' | 'Internship' | 'Extra-curricular';
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  credits: number;
  approver?: string;
  documentUrl?: string;
};

export type AcademicStats = {
  gpa: number;
  attendance: number;
  credits: number;
};
