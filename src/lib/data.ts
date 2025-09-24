import type { User, Activity, AcademicStats, AcademicRecord, Student, Faculty, Course } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

export const user: User = {
  name: 'Kartavya Shresth',
  email: 'kartavya@gecv',
  avatarUrl: userAvatar?.imageUrl || 'https://picsum.photos/seed/user-avatar/100/100',
  program: 'B.Tech in Computer Science',
  studentId: 'STU123456',
};

export const facultyUser: Faculty = {
    name: 'pradeep srivastav',
    email: 'pradeep@hodgecv',
    avatarUrl: 'https://picsum.photos/seed/alan-grant/100/100',
    department: 'Computer Science',
    branch: 'Computer Science',
};

export const registeredFaculty: Faculty[] = [
    {
        name: 'pradeep srivastav',
        email: 'pradeep@hodgecv',
        avatarUrl: 'https://picsum.photos/seed/alan-grant/100/100',
        department: 'Computer Science',
        branch: 'Computer Science',
    },
     {
        name: 'nivedita singh',
        email: 'nivedita@assprofgecv',
        avatarUrl: 'https://picsum.photos/seed/ellie-sattler/100/100',
        department: 'Paleobotany',
        branch: 'General',
    }
];

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
    approver: 'dr. sumit kumar',
    skills: ['Machine Learning', 'Public Speaking'],
    documentUrl: 'https://picsum.photos/seed/doc-act001/800/1100',
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
    documentUrl: 'https://picsum.photos/seed/doc-act002/800/1100',
  },
  {
    id: 'act003',
    name: 'Data Science with Python',
    type: 'MOOC',
    date: '2023-11-05',
    status: 'Pending',
    credits: 10,
    skills: ['Python', 'Pandas', 'Data Analysis'],
    documentUrl: 'https://picsum.photos/seed/doc-act003/800/1100',
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
    type: 'Leadership Role',
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
    approver: 'dr. sumit kumar',
    skills: ['Research', 'Academic Writing'],
  },
  {
    id: 'act007',
    name: 'Varsity Basketball Team',
    type: 'Extra-curricular',
    date: '2023-09-01',
    status: 'Approved',
    credits: 3,
    approver: 'Coach Amit',
    skills: ['Teamwork', 'Athleticism', 'Sportsmanship'],
  },
  {
    id: 'act013',
    name: 'CodeFest 2024 Hackathon',
    type: 'Competition',
    date: '2024-03-12',
    status: 'Approved',
    credits: 6,
    approver: 'Dr. Sumit Kumar',
    skills: ['Problem Solving', 'Java', 'Teamwork'],
  },
  {
    id: 'act014',
    name: 'Local Charity Drive',
    type: 'Volunteering',
    date: '2023-12-15',
    status: 'Approved',
    credits: 2,
    approver: 'City Outreach Program',
    skills: ['Community Engagement', 'Organization'],
  }
];

export const academicRecords: AcademicRecord[] = [
  { id: 'rec001', courseName: 'Introduction to Algorithms', courseCode: 'CS101', semester: 'Fall 2022', grade: 'A' },
  { id: 'rec002', courseName: 'Data Structures', courseCode: 'CS102', semester: 'Spring 2023', grade: 'A-' },
  { id: 'rec003', courseName: 'Database Management Systems', courseCode: 'CS201', semester: 'Fall 2023', grade: 'B+' },
  { id: 'rec004', courseName: 'Operating Systems', courseCode: 'CS202', semester: 'Spring 2024', grade: 'A' },
];

export const courses: Course[] = [
    { id: 'crs001', name: 'Advanced Algorithms', instructor: 'Dr. Sumit Kumar', progress: 75, imageUrl: 'https://picsum.photos/seed/algorithms/600/400', category: 'Computer Science' },
    { id: 'crs002', name: 'Machine Learning Foundations', instructor: 'Dr. Nivedita Singh', progress: 45, imageUrl: 'https://picsum.photos/seed/ml/600/400', category: 'Computer Science' },
    { id: 'crs003', name: 'Thermodynamics', instructor: 'Dr. Pradeep Srivastav', progress: 90, imageUrl: 'https://picsum.photos/seed/thermo/600/400', category: 'Mechanical Engineering' },
    { id: 'crs004', name: 'Digital Marketing', instructor: 'Prof. Sneha Roy', progress: 60, imageUrl: 'https://picsum.photos/seed/marketing/600/400', category: 'Business' },
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
    branch: 'Computer Science',
  },
  {
    name: 'amit singh',
    email: 'amit@gecv',
    avatarUrl: 'https://picsum.photos/seed/jane-smith/100/100',
    program: 'B.A. in Digital Media',
    studentId: 'STU654321',
    stats: {
        gpa: 3.5,
        attendance: 95,
        credits: 78
    },
    activities: [
        { id: 'act008', name: 'Photography Club', type: 'Extra-curricular', date: '2023-09-01', status: 'Approved', credits: 4, skills: ['Photography', 'Adobe Photoshop'] },
        { id: 'act011', name: 'Short Film Project', type: 'Extra-curricular', date: '2024-03-01', status: 'Pending', credits: 7, skills: ['Video Editing', 'Storytelling'], documentUrl: 'https://picsum.photos/seed/doc-act011/800/1100' }
    ],
    skills: ['Photography', 'Adobe Photoshop', 'Graphic Design'],
    branch: 'Digital Media',
  },
  {
    name: 'rajneesh yadav',
    email: 'rajneesh@gecv',
    avatarUrl: 'https://picsum.photos/seed/robert-j/100/100',
    program: 'B.S. in Mechanical Engineering',
    studentId: 'STU789012',
    stats: {
        gpa: 3.9,
        attendance: 88,
        credits: 92
    },
    activities: [
        { id: 'act009', name: 'Robotics Competition', type: 'Competition', date: '2024-02-15', status: 'Approved', credits: 6, skills: ['Robotics', 'CAD', 'Problem Solving'] }
    ],
    skills: ['Robotics', 'CAD', 'Problem Solving', 'Leadership'],
    branch: 'Mechanical Engineering',
  },
  {
    name: 'sneha roy',
    email: 'sneha@gecv',
    avatarUrl: 'https://picsum.photos/seed/emily-w/100/100',
    program: 'B.Tech in Computer Science',
    studentId: 'STU345678',
    stats: {
        gpa: 3.2,
        attendance: 91,
        credits: 75
    },
    activities: [
        { id: 'act010', name: 'Debate Team Captain', type: 'Leadership Role', date: '2023-10-01', status: 'Approved', credits: 5, skills: ['Public Speaking', 'Critical Thinking', 'Leadership'] },
        { id: 'act012', name: 'Hackathon Participation', type: 'Competition', date: '2024-04-12', status: 'Pending', credits: 5, skills: ['Java', 'Problem Solving'], documentUrl: 'https://picsum.photos/seed/doc-act012/800/1100' }
    ],
    skills: ['Public Speaking', 'Critical Thinking', 'Leadership', 'Java'],
    branch: 'Computer Science',
  }
]
