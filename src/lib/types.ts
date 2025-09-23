export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  program: string;
  studentId: string;
};

export type Faculty = {
    name: string;
    email: string;
    avatarUrl: string;
    department: string;
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
  skills?: string[];
};

export type AcademicStats = {
  gpa: number;
  attendance: number;
  credits: number;
};

export type AcademicRecord = {
  id: string;
  courseName: string;
  courseCode: string;
  semester: string;
  grade: string;
};

export type Student = User & {
    stats: AcademicStats;
    activities: Activity[];
    skills?: string[];
}

export type Placement = {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  role: string;
  type: 'Internship' | 'Full-time';
  location: string;
  description: string;
  tags: string[];
};

export type CollegeEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export type RegisteredUser = {
    name: string;
    email: string;
    role: 'student' | 'faculty' | 'employer' | 'institute_admin';
};

export type Course = {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  imageUrl: string;
  category: string;
};
