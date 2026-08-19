import { AuthUser } from './authUser';

export interface DemoAccountCredentials {
  email: string;
  password: string;
  user: AuthUser;
}

export const COLLEGE_NAME = 'Sri Manakula Vinayagar Engineering College';

export const DEMO_ACCOUNTS: DemoAccountCredentials[] = [
  // 1. Dr. M. Auxilia (HOD of IT)
  {
    email: 'auxilia.hod@college.edu',
    password: 'Aux@HOD2026!',
    user: {
      id: 'HOD001',
      name: 'Dr. M. Auxilia',
      email: 'auxilia.hod@college.edu',
      role: 'hod',
      dept: 'Information Technology (IT)',
      departmentCode: 'IT',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },

  // 2. Mentors
  {
    email: 'auxilia.mentor@college.edu',
    password: 'Aux@Mentor2026!',
    user: {
      id: 'MENTOR001',
      name: 'Dr. M. Auxilia',
      email: 'auxilia.mentor@college.edu',
      role: 'mentor',
      dept: 'Information Technology (IT)',
      departmentCode: 'IT',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'devika.mentor@college.edu',
    password: 'Dev@Mentor2026!',
    user: {
      id: 'MENTOR002',
      name: 'Mrs. K. Devika',
      email: 'devika.mentor@college.edu',
      role: 'mentor',
      dept: 'Information Technology (IT)',
      departmentCode: 'IT',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'viji.mentor@college.edu',
    password: 'Viji@Mentor2026!',
    user: {
      id: 'MENTOR003',
      name: 'Mrs. M. Viji',
      email: 'viji.mentor@college.edu',
      role: 'mentor',
      dept: 'Information Technology (IT)',
      departmentCode: 'IT',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'thamizharasi.mentor@college.edu',
    password: 'Thami@Mentor2026!',
    user: {
      id: 'MENTOR004',
      name: 'Mrs. E. Thamizharasi',
      email: 'thamizharasi.mentor@college.edu',
      role: 'mentor',
      dept: 'Electronics and Communication Engineering (ECE)',
      departmentCode: 'ECE',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'sakthipriya.mentor@college.edu',
    password: 'Sakthi@Mentor2026!',
    user: {
      id: 'MENTOR005',
      name: 'Dr. N. Sakthipriya',
      email: 'sakthipriya.mentor@college.edu',
      role: 'mentor',
      dept: 'Electronics and Communication Engineering (ECE)',
      departmentCode: 'ECE',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'sudharsan.mentor@college.edu',
    password: 'Sudhar@Mentor2026!',
    user: {
      id: 'MENTOR006',
      name: 'Mr. P. Sudharsan',
      email: 'sudharsan.mentor@college.edu',
      role: 'mentor',
      dept: 'Electrical and Electronics Engineering (EEE)',
      departmentCode: 'EEE',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
  {
    email: 'maheshwari.mentor@college.edu',
    password: 'Mahesh@Mentor2026!',
    user: {
      id: 'MENTOR007',
      name: 'Mrs. G. Maheshwari',
      email: 'maheshwari.mentor@college.edu',
      role: 'mentor',
      dept: 'Mechanical Engineering (MECH)',
      departmentCode: 'MECH',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },

  // 3. Student Demo Account (Assigned to Dr. M. Auxilia - MENTOR001)
  {
    email: 'student@internpulse.demo',
    password: 'student123',
    user: {
      id: '23IT001',
      studentId: '23IT001',
      mentorId: 'MENTOR001',
      name: 'Rahul Kumar',
      email: 'student@internpulse.demo',
      role: 'student',
      dept: 'Information Technology (IT)',
      departmentCode: 'IT',
      year: '3rd Year',
      college: COLLEGE_NAME,
      company: 'Amazon Web Services',
      internshipRole: 'Cloud Solutions Intern',
      setupComplete: true,
    },
  },

  // 4. Admin Account (College-Wide)
  {
    email: 'admin@internpulse.demo',
    password: 'admin123',
    user: {
      id: 'ADM_SMVEC_01',
      name: 'SMVEC Academic Administrator',
      email: 'admin@internpulse.demo',
      role: 'admin',
      dept: 'Deanery / Academic Cell',
      departmentCode: 'ALL',
      college: COLLEGE_NAME,
      setupComplete: true,
    },
  },
];
