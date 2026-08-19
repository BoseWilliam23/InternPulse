import { AuthUser, RegisterStudentParams, InternshipSetupParams, AuthResponse, UserRole } from './authUser';
import { DEMO_ACCOUNTS, COLLEGE_NAME } from './demoAccounts';

export interface IAuthService {
  login(emailOrId: string, password: string): Promise<AuthResponse>;
  registerStudent(params: RegisterStudentParams): Promise<AuthResponse>;
  completeInternshipSetup(studentId: string, details: InternshipSetupParams): Promise<AuthResponse>;
  logout(): void;
  getCurrentUser(): AuthUser | null;
  isAuthenticated(): boolean;
  getCurrentUserRole(): UserRole | null;
}

const SESSION_KEY = 'internpulse_auth_session';
const REGISTERED_USERS_KEY = 'internpulse_registered_students';

interface RegisteredStudentEntry {
  password: string;
  user: AuthUser;
}

class LocalAuthService implements IAuthService {
  private currentUser: AuthUser | null = null;
  private registeredStudents: Map<string, RegisteredStudentEntry> = new Map();

  constructor() {
    this.loadStateFromStorage();
  }

  private loadStateFromStorage(): void {
    try {
      // Load current session
      const sessionJson = localStorage.getItem(SESSION_KEY);
      if (sessionJson) {
        this.currentUser = JSON.parse(sessionJson);
      }

      // Load registered students
      const registeredJson = localStorage.getItem(REGISTERED_USERS_KEY);
      if (registeredJson) {
        const parsed = JSON.parse(registeredJson);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: RegisteredStudentEntry) => {
            this.registeredStudents.set(item.user.email.toLowerCase(), item);
            if (item.user.studentId) {
              this.registeredStudents.set(item.user.studentId.toLowerCase(), item);
            }
          });
        }
      }
    } catch (e) {
      console.error('Error loading auth state from storage:', e);
    }
  }

  private persistSession(): void {
    try {
      if (this.currentUser) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      console.error('Error persisting auth session:', e);
    }
  }

  private persistRegisteredStudents(): void {
    try {
      const list = Array.from(new Set(Array.from(this.registeredStudents.values())));
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error persisting registered students:', e);
    }
  }

  public async login(emailOrId: string, password: string): Promise<AuthResponse> {
    // Artificial delay to simulate realistic validation latency
    await new Promise((resolve) => setTimeout(resolve, 350));

    const query = emailOrId.trim().toLowerCase();

    // 1. Check static demo accounts
    const demoMatch = DEMO_ACCOUNTS.find(
      (acc) =>
        (acc.email.toLowerCase() === query || acc.user.id.toLowerCase() === query) &&
        acc.password === password
    );

    if (demoMatch) {
      this.currentUser = { ...demoMatch.user };
      this.persistSession();
      return {
        success: true,
        user: this.currentUser,
      };
    }

    // 2. Check locally registered student accounts
    const registeredMatch = this.registeredStudents.get(query);
    if (registeredMatch) {
      if (registeredMatch.password === password) {
        this.currentUser = { ...registeredMatch.user };
        this.persistSession();
        return {
          success: true,
          user: this.currentUser,
        };
      } else {
        return {
          success: false,
          message: 'Invalid password. Please check your credentials.',
        };
      }
    }

    return {
      success: false,
      message: 'No account found matching this Email or Student ID.',
    };
  }

  public async registerStudent(params: RegisterStudentParams): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const emailKey = params.email.trim().toLowerCase();
    const idKey = params.studentId.trim().toLowerCase();

    // Check if already registered
    if (this.registeredStudents.has(emailKey) || this.registeredStudents.has(idKey)) {
      return {
        success: false,
        message: 'An account with this Email or Student ID already exists.',
      };
    }

    const newUser: AuthUser = {
      id: params.studentId.trim().toUpperCase(),
      studentId: params.studentId.trim().toUpperCase(),
      name: params.fullName.trim(),
      email: params.email.trim(),
      phone: params.phone.trim(),
      role: 'student',
      year: params.academicYear,
      dept: params.department,
      college: COLLEGE_NAME,
      setupComplete: false, // Must proceed to Internship Setup
    };

    const entry: RegisteredStudentEntry = {
      password: params.password,
      user: newUser,
    };

    this.registeredStudents.set(emailKey, entry);
    this.registeredStudents.set(idKey, entry);
    this.persistRegisteredStudents();

    // Set as currently authenticated student in setup mode
    this.currentUser = newUser;
    this.persistSession();

    return {
      success: true,
      user: newUser,
    };
  }

  public async completeInternshipSetup(
    studentId: string,
    details: InternshipSetupParams
  ): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!this.currentUser || this.currentUser.id !== studentId) {
      return {
        success: false,
        message: 'Session mismatch. Please log in again.',
      };
    }

    const updatedUser: AuthUser = {
      ...this.currentUser,
      company: details.companyName.trim(),
      internshipRole: details.internshipRole.trim(),
      startDate: details.startDate,
      endDate: details.endDate,
      internshipDescription: details.description.trim(),
      setupComplete: true,
    };

    this.currentUser = updatedUser;
    this.persistSession();

    // Update in registered students map
    const emailKey = updatedUser.email.toLowerCase();
    const idKey = updatedUser.id.toLowerCase();
    const existing = this.registeredStudents.get(emailKey) || this.registeredStudents.get(idKey);
    if (existing) {
      existing.user = updatedUser;
      this.persistRegisteredStudents();
    }

    return {
      success: true,
      user: updatedUser,
    };
  }

  public logout(): void {
    this.currentUser = null;
    this.persistSession();
  }

  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public getCurrentUserRole(): UserRole | null {
    return this.currentUser?.role || null;
  }
}

export const authService = new LocalAuthService();
