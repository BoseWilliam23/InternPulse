import { StudentRecord, MentorRecord, DEFAULT_STUDENTS, DEFAULT_MENTORS, MENTOR_ACCOUNTS_MAP } from '../../data/initialData';
import { AuthUser } from '../auth/authUser';

export interface IInternshipRepository {
  // Scoped student access
  getStudentById(studentId: string): StudentRecord | null;
  getStudentsForStudent(studentId: string): StudentRecord[];
  getStudentsForMentor(mentorIdOrName: string): StudentRecord[];
  getStudentsForHod(departmentCode: string): StudentRecord[];
  getAllStudentsForAdmin(): StudentRecord[];

  // Scoped mentor access
  getMentorById(mentorId: string): MentorRecord | null;
  getMentorsForHod(departmentCode: string): MentorRecord[];
  getAllMentorsForAdmin(): MentorRecord[];

  // Scoped mutations & real-time log submissions
  submitStudentDailyLog(
    studentId: string, 
    log: { 
      work: string; 
      hours: number; 
      status: StudentRecord['status']; 
      blocker?: string;
    }
  ): StudentRecord;
  
  updateStudentMentor(studentId: string, newMentorId: string, newMentorName: string): void;
  replaceDataset(newStudents: StudentRecord[]): void;
  clearAllDataset(): void;
  getAllStudents(): StudentRecord[];
}

const DATASET_STORAGE_KEY = 'internpulse_dataset';

class LocalInternshipRepository implements IInternshipRepository {
  private students: StudentRecord[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(DATASET_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize existing data to guarantee mentorId and departmentCode
          this.students = this.normalizeStudentRecords(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading dataset from localStorage:', e);
    }
    this.students = [...DEFAULT_STUDENTS];
    this.persistToStorage();
  }

  private normalizeStudentRecords(records: any[]): StudentRecord[] {
    return records.map((s, index) => {
      const deptCode = s.departmentCode || s.dept || 'IT';
      const mentorName = s.mentor || 'Dr. M. Auxilia';
      const mentorId = s.mentorId || MENTOR_ACCOUNTS_MAP[mentorName] || 'MENTOR001';

      return {
        id: s.id || s.studentId || `ST_${index + 1}`,
        studentId: s.studentId || s.id || `23IT00${index + 1}`,
        studentName: s.studentName || s.name || 'Student Intern',
        email: s.email || `${(s.studentId || 'student').toLowerCase()}@smvec.ac.in`,
        academicYear: s.academicYear || s.year || '3rd Year',
        year: s.year || s.academicYear || '3rd Year',
        departmentCode: deptCode.toUpperCase(),
        dept: deptCode.toUpperCase(),
        company: s.company || 'Host Organization',
        mentorId: mentorId,
        mentor: mentorName,
        mentorEmail: s.mentorEmail || 'faculty@college.edu',
        role: s.role || 'Intern',
        status: s.status || 'onTrack',
        progress: typeof s.progress === 'number' ? s.progress : 50,
        hours: typeof s.hours === 'number' ? s.hours : 8,
        work: s.work || 'Milestone sprint in progress.',
        blocker: s.blocker,
        time: s.time || 'Today',
      };
    });
  }

  private persistToStorage(): void {
    try {
      localStorage.setItem(DATASET_STORAGE_KEY, JSON.stringify(this.students));
    } catch (e) {
      console.error('Error persisting dataset to localStorage:', e);
    }
  }

  // ====================================================
  // 1. STUDENT SCOPED DATA ACCESS (OWN DATA ONLY)
  // ====================================================
  public getStudentById(studentId: string): StudentRecord | null {
    const query = studentId.trim().toLowerCase();
    return this.students.find(s => s.studentId.toLowerCase() === query || s.id.toLowerCase() === query) || null;
  }

  public getStudentsForStudent(studentId: string): StudentRecord[] {
    const student = this.getStudentById(studentId);
    return student ? [student] : [];
  }

  // ====================================================
  // 2. MENTOR SCOPED DATA ACCESS (ONLY ASSIGNED STUDENTS)
  // ====================================================
  public getStudentsForMentor(mentorIdOrName: string): StudentRecord[] {
    const query = mentorIdOrName.trim().toLowerCase();
    return this.students.filter(s => 
      s.mentorId?.toLowerCase() === query || 
      s.mentor.toLowerCase() === query ||
      (MENTOR_ACCOUNTS_MAP[s.mentor] && MENTOR_ACCOUNTS_MAP[s.mentor].toLowerCase() === query)
    );
  }

  // ====================================================
  // 3. HOD SCOPED DATA ACCESS (ONLY THEIR DEPARTMENT)
  // ====================================================
  public getStudentsForHod(departmentCode: string): StudentRecord[] {
    const dept = departmentCode.trim().toUpperCase();
    return this.students.filter(s => s.departmentCode.toUpperCase() === dept || s.dept.toUpperCase() === dept);
  }

  public getMentorsForHod(departmentCode: string): MentorRecord[] {
    const dept = departmentCode.trim().toUpperCase();
    
    // Get distinct mentors actively handling students in this department
    const deptMentors = DEFAULT_MENTORS.filter(m => 
      m.departmentCode.toUpperCase() === dept || 
      m.departmentCodes.some(d => d.toUpperCase() === dept)
    );

    // Compute live stats for each mentor within this department
    return deptMentors.map(mentor => {
      const mentorStudents = this.students.filter(s => 
        (s.mentorId === mentor.id || s.mentor.toLowerCase() === mentor.name.toLowerCase()) &&
        (s.departmentCode.toUpperCase() === dept || s.dept.toUpperCase() === dept)
      );

      const totalProgress = mentorStudents.reduce((sum, st) => sum + st.progress, 0);
      const avgProgress = mentorStudents.length > 0 ? Math.round(totalProgress / mentorStudents.length) : 0;
      const atRiskCount = mentorStudents.filter(st => st.status === 'blocked' || st.status === 'inactive').length;

      return {
        ...mentor,
        assignedStudentsCount: mentorStudents.length,
        studentIds: mentorStudents.map(st => st.studentId),
        averageProgress: avgProgress,
        atRiskCount: atRiskCount,
      };
    });
  }

  public getMentorById(mentorId: string): MentorRecord | null {
    const q = mentorId.trim().toLowerCase();
    const found = DEFAULT_MENTORS.find(m => m.id.toLowerCase() === q || m.name.toLowerCase() === q);
    if (!found) return null;

    const assignedStudents = this.getStudentsForMentor(found.id);
    const avgProg = assignedStudents.length > 0 
      ? Math.round(assignedStudents.reduce((sum, s) => sum + s.progress, 0) / assignedStudents.length) 
      : 0;
    const atRisk = assignedStudents.filter(s => s.status === 'blocked' || s.status === 'inactive').length;

    return {
      ...found,
      assignedStudentsCount: assignedStudents.length,
      studentIds: assignedStudents.map(s => s.studentId),
      averageProgress: avgProg,
      atRiskCount: atRisk,
    };
  }

  // ====================================================
  // 4. ADMIN SCOPED DATA ACCESS (ENTIRE COLLEGE)
  // ====================================================
  public getAllStudentsForAdmin(): StudentRecord[] {
    return [...this.students];
  }

  public getAllMentorsForAdmin(): MentorRecord[] {
    return DEFAULT_MENTORS.map(m => {
      const assigned = this.getStudentsForMentor(m.id);
      const avgProg = assigned.length > 0 
        ? Math.round(assigned.reduce((sum, s) => sum + s.progress, 0) / assigned.length) 
        : 0;
      const atRisk = assigned.filter(s => s.status === 'blocked' || s.status === 'inactive').length;

      return {
        ...m,
        assignedStudentsCount: assigned.length,
        studentIds: assigned.map(s => s.studentId),
        averageProgress: avgProg,
        atRiskCount: atRisk,
      };
    });
  }

  public getAllStudents(): StudentRecord[] {
    return [...this.students];
  }

  // ====================================================
  // 5. MUTATIONS & REAL-TIME LOG SUBMISSIONS
  // ====================================================
  public submitStudentDailyLog(
    studentId: string, 
    log: { 
      work: string; 
      hours: number; 
      status: StudentRecord['status']; 
      blocker?: string;
    }
  ): StudentRecord {
    const index = this.students.findIndex(
      s => s.studentId.toLowerCase() === studentId.trim().toLowerCase() || s.id.toLowerCase() === studentId.trim().toLowerCase()
    );

    if (index === -1) {
      throw new Error(`Student record not found for ID: ${studentId}`);
    }

    const current = this.students[index];
    const newProgress = Math.min(100, Math.max(0, current.progress + (log.status === 'completed' ? 100 - current.progress : 5)));

    const updated: StudentRecord = {
      ...current,
      work: log.work.trim(),
      hours: log.hours,
      status: log.status,
      blocker: log.blocker?.trim() || undefined,
      progress: newProgress,
      time: 'Just now',
    };

    this.students[index] = updated;
    this.persistToStorage();
    return updated;
  }

  public updateStudentMentor(studentId: string, newMentorId: string, newMentorName: string): void {
    const index = this.students.findIndex(s => s.studentId === studentId || s.id === studentId);
    if (index !== -1) {
      this.students[index] = {
        ...this.students[index],
        mentorId: newMentorId,
        mentor: newMentorName,
      };
      this.persistToStorage();
    }
  }

  public replaceDataset(newStudents: StudentRecord[]): void {
    this.students = this.normalizeStudentRecords(newStudents);
    this.persistToStorage();
  }

  public clearAllDataset(): void {
    this.students = [];
    this.persistToStorage();
  }
}

export const internshipRepository = new LocalInternshipRepository();
