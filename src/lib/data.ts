import type { User, Activity, AcademicStats, AcademicRecord } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

export const user: User = {
  name: 'Alex Doe',
  email: 'alex.doe@university.edu',
  avatarUrl: userAvatar?.imageUrl || 'https://picsum.photos/seed/user-avatar/100/100',
  program: 'B.Tech in Computer Science',
  studentId: 'STU123456',
};

export const academicStats: AcademicStats = {
  gpa: 3.8,
  attendance: 92,
  credits: 85,
};

export const activities: Activity[] = [
  {
    id: 'act001',
    name: 'AI in Modern Systems Conference',
    type: 'Conference',
    date: '2023-10-22',
    status: 'Approved',
    credits: 5,
    approver: 'Dr. Evelyn Reed',
  },
  {
    id: 'act002',
    name: 'Full-Stack Development Internship',
    type: 'Internship',
    date: '2023-08-30',
    status: 'Approved',
    credits: 15,
    approver: 'Tech Solutions Inc.',
  },
  {
    id: 'act003',
    name: 'Data Science with Python',
    type: 'MOOC',
    date: '2023-11-05',
    status: 'Pending',
    credits: 10,
  },
  {
    id: 'act004',
    name: 'Guest Lecture on Quantum Computing',
    type: 'Seminar',
    date: '2023-09-15',
    status: 'Approved',
    credits: 2,
    approver: 'Prof. Alan Grant',
  },
  {
    id: 'act005',
    name: 'University Coding Club President',
    type: 'Extra-curricular',
    date: '2023-05-20',
    status: 'Approved',
    credits: 8,
    approver: 'Faculty of Student Affairs',
  },
  {
    id: 'act006',
    name: 'Paper on "Machine Learning Ethics"',
    type: 'Conference',
    date: '2024-01-10',
    status: 'Rejected',
    credits: 5,
    approver: 'Dr. Evelyn Reed',
  },
];

export const academicRecords: AcademicRecord[] = [
  { id: 'rec001', courseName: 'Introduction to Algorithms', courseCode: 'CS101', semester: 'Fall 2022', grade: 'A' },
  { id: 'rec002', courseName: 'Data Structures', courseCode: 'CS102', semester: 'Spring 2023', grade: 'A-' },
  { id: 'rec003', courseName: 'Database Management Systems', courseCode: 'CS201', semester: 'Fall 2023', grade: 'B+' },
  { id: 'rec004', courseName: 'Operating Systems', courseCode: 'CS202', semester: 'Spring 2024', grade: 'A' },
];
