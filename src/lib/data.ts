import type { User, Activity, AcademicStats, AcademicRecord, Student } from '@/lib/types';
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
    skills: ['Machine Learning', 'Public Speaking'],
  },
  {
    id: 'act002',
    name: 'Full-Stack Development Internship',
    type: 'Internship',
    date: '2023-08-30',
    status: 'Approved',
    credits: 15,
    approver: 'Tech Solutions Inc.',
    skills: ['React', 'Node.js', 'Teamwork'],
  },
  {
    id: 'act003',
    name: 'Data Science with Python',
    type: 'MOOC',
    date: '2023-11-05',
    status: 'Pending',
    credits: 10,
    skills: ['Python', 'Pandas', 'Data Analysis'],
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
    skills: ['Leadership', 'Project Management'],
  },
  {
    id: 'act006',
    name: 'Paper on "Machine Learning Ethics"',
    type: 'Conference',
    date: '2024-01-10',
    status: 'Rejected',
    credits: 5,
    approver: 'Dr. Evelyn Reed',
    skills: ['Research', 'Academic Writing'],
  },
  {
    id: 'act007',
    name: 'Varsity Basketball Team',
    type: 'Extra-curricular',
    date: '2023-09-01',
    status: 'Approved',
    credits: 3,
    approver: 'Coach Davis',
    skills: ['Teamwork', 'Athleticism', 'Sportsmanship'],
  }
];

export const academicRecords: AcademicRecord[] = [
  { id: 'rec001', courseName: 'Introduction to Algorithms', courseCode: 'CS101', semester: 'Fall 2022', grade: 'A' },
  { id: 'rec002', courseName: 'Data Structures', courseCode: 'CS102', semester: 'Spring 2023', grade: 'A-' },
  { id: 'rec003', courseName: 'Database Management Systems', courseCode: 'CS201', semester: 'Fall 2023', grade: 'B+' },
  { id: 'rec004', courseName: 'Operating Systems', courseCode: 'CS202', semester: 'Spring 2024', grade: 'A' },
];

const allSkills = (activities: Activity[]) => {
    const approvedActivities = activities.filter(a => a.status === 'Approved');
    return [...new Set(approvedActivities.flatMap(a => a.skills || []))];
}

export const students: Student[] = [
  {
    ...user,
    stats: academicStats,
    activities: activities,
    skills: allSkills(activities),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    avatarUrl: 'https://picsum.photos/seed/jane-smith/100/100',
    program: 'B.A. in Digital Media',
    studentId: 'STU654321',
    stats: {
        gpa: 3.5,
        attendance: 95,
        credits: 78
    },
    activities: [
        { id: 'act008', name: 'Photography Club', type: 'Extra-curricular', date: '2023-09-01', status: 'Approved', credits: 4, skills: ['Photography', 'Adobe Photoshop'] }
    ],
    skills: ['Photography', 'Adobe Photoshop', 'Graphic Design'],
  },
  {
    name: 'Robert Johnson',
    email: 'robert.j@university.edu',
    avatarUrl: 'https://picsum.photos/seed/robert-j/100/100',
    program: 'B.S. in Mechanical Engineering',
    studentId: 'STU789012',
    stats: {
        gpa: 3.9,
        attendance: 88,
        credits: 92
    },
    activities: [
        { id: 'act009', name: 'Robotics Competition', type: 'Extra-curricular', date: '2024-02-15', status: 'Approved', credits: 6, skills: ['Robotics', 'CAD', 'Problem Solving'] }
    ],
    skills: ['Robotics', 'CAD', 'Problem Solving', 'Leadership'],
  },
  {
    name: 'Emily White',
    email: 'emily.w@university.edu',
    avatarUrl: 'https://picsum.photos/seed/emily-w/100/100',
    program: 'B.Tech in Computer Science',
    studentId: 'STU345678',
    stats: {
        gpa: 3.2,
        attendance: 91,
        credits: 75
    },
    activities: [
        { id: 'act010', name: 'Debate Team Captain', type: 'Extra-curricular', date: '2023-10-01', status: 'Approved', credits: 5, skills: ['Public Speaking', 'Critical Thinking', 'Leadership'] }
    ],
    skills: ['Public Speaking', 'Critical Thinking', 'Leadership', 'Java'],
  }
]
