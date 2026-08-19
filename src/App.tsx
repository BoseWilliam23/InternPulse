import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, 
  LogOut, 
  ChevronDown
} from 'lucide-react';
import { StudentRecord, DEFAULT_STUDENTS } from './data/initialData';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { InternshipSetupPage } from './components/InternshipSetupPage';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { StudentDashboard } from './components/StudentDashboard';
import { MentorDashboard } from './components/MentorDashboard';
import { HodDashboard } from './components/HodDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { authService } from './core/auth/authService';
import { AuthUser, RegisterStudentParams, InternshipSetupParams } from './core/auth/authUser';
import { internshipRepository } from './core/repository/internshipRepository';
import { DEMO_ACCOUNTS } from './core/auth/demoAccounts';

type AppRoute = 
  | '/login' 
  | '/register' 
  | '/setup-internship' 
  | '/student/dashboard' 
  | '/mentor/dashboard' 
  | '/hod/dashboard' 
  | '/admin/dashboard';

export default function App() {
  // 1. Session State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authService.getCurrentUser());
  const [authLoading, setAuthLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // Quick Switcher dropdown state in Header for seamless demo/testing
  const [isQuickSwitchOpen, setIsQuickSwitchOpen] = useState(false);

  // 2. Navigation Routing
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const user = authService.getCurrentUser();
    if (!user) return '/login';
    if (user.role === 'student' && user.setupComplete === false) return '/setup-internship';
    if (user.role === 'student') return '/student/dashboard';
    if (user.role === 'mentor') return '/mentor/dashboard';
    if (user.role === 'hod') return '/hod/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/login';
  });

  // Role Enforcement & Route Synchronization
  useEffect(() => {
    if (!currentUser) {
      if (currentRoute !== '/login' && currentRoute !== '/register') {
        setCurrentRoute('/login');
      }
    } else {
      if (currentUser.role === 'student' && currentUser.setupComplete === false) {
        setCurrentRoute('/setup-internship');
      } else if (currentUser.role === 'student' && currentRoute !== '/student/dashboard') {
        setCurrentRoute('/student/dashboard');
      } else if (currentUser.role === 'mentor' && currentRoute !== '/mentor/dashboard') {
        setCurrentRoute('/mentor/dashboard');
      } else if (currentUser.role === 'hod' && currentRoute !== '/hod/dashboard') {
        setCurrentRoute('/hod/dashboard');
      } else if (currentUser.role === 'admin' && currentRoute !== '/admin/dashboard') {
        setCurrentRoute('/admin/dashboard');
      }
    }
  }, [currentUser, currentRoute]);

  // Read institutional students list
  const totalStudents = useMemo(() => {
    return internshipRepository.getAllStudentsForAdmin();
  }, [dataVersion]);

  // Scoped Data for active Student
  const activeStudentData = useMemo(() => {
    if (!currentUser || currentUser.role !== 'student') {
      return totalStudents[0] || DEFAULT_STUDENTS[0];
    }
    const studentId = currentUser.studentId || currentUser.id;
    const found = internshipRepository.getStudentById(studentId);
    if (found) return found;

    // Fallback for newly registered student
    return {
      id: currentUser.id,
      studentId: studentId,
      studentName: currentUser.name,
      email: currentUser.email,
      year: currentUser.year || '3rd Year',
      academicYear: currentUser.year || '3rd Year',
      dept: currentUser.departmentCode || currentUser.dept || 'IT',
      departmentCode: currentUser.departmentCode || currentUser.dept || 'IT',
      company: currentUser.company || 'Host Organization',
      mentor: 'Dr. M. Auxilia',
      mentorId: 'MENTOR001',
      mentorEmail: 'auxilia.mentor@college.edu',
      role: currentUser.internshipRole || 'Intern',
      status: 'onTrack',
      progress: 25,
      hours: 8,
      work: currentUser.internshipDescription || 'Internship setup complete.',
      time: 'Today',
    } as StudentRecord;
  }, [currentUser, dataVersion, totalStudents]);

  // Scoped Data for active Mentor
  const mentorAssignedStudents = useMemo(() => {
    if (!currentUser || currentUser.role !== 'mentor') return [];
    return internshipRepository.getStudentsForMentor(currentUser.id);
  }, [currentUser, dataVersion]);

  // Scoped Data for active HOD
  const hodDepartmentCode = currentUser?.departmentCode || currentUser?.dept?.split(' ')[0] || 'IT';
  const hodDepartmentStudents = useMemo(() => {
    if (!currentUser || currentUser.role !== 'hod') return [];
    return internshipRepository.getStudentsForHod(hodDepartmentCode);
  }, [currentUser, hodDepartmentCode, dataVersion]);

  const hodDepartmentMentors = useMemo(() => {
    if (!currentUser || currentUser.role !== 'hod') return [];
    return internshipRepository.getMentorsForHod(hodDepartmentCode);
  }, [currentUser, hodDepartmentCode, dataVersion]);

  // Handle Login Authentication
  const handleLogin = async (emailOrId: string, pass: string) => {
    setAuthLoading(true);
    try {
      const resp = await authService.login(emailOrId, pass);
      setAuthLoading(false);
      if (resp.success && resp.user) {
        setCurrentUser(resp.user);
        if (resp.user.role === 'student' && resp.user.setupComplete === false) {
          setCurrentRoute('/setup-internship');
        } else if (resp.user.role === 'student') {
          setCurrentRoute('/student/dashboard');
        } else if (resp.user.role === 'mentor') {
          setCurrentRoute('/mentor/dashboard');
        } else if (resp.user.role === 'hod') {
          setCurrentRoute('/hod/dashboard');
        } else if (resp.user.role === 'admin') {
          setCurrentRoute('/admin/dashboard');
        }
      } else {
        throw new Error(resp.message || 'Invalid credentials.');
      }
    } catch (e) {
      setAuthLoading(false);
      throw e;
    }
  };

  // Quick switch role (Helper for prototype testing of all 4 roles)
  const handleQuickSwitchUser = (demoUser: AuthUser) => {
    authService.logout();
    localStorage.setItem('internpulse_auth_user', JSON.stringify(demoUser));
    setCurrentUser(demoUser);
    setIsQuickSwitchOpen(false);
  };

  // Handle Student Registration
  const handleRegisterStudent = async (params: RegisterStudentParams) => {
    setAuthLoading(true);
    try {
      const resp = await authService.registerStudent(params);
      setAuthLoading(false);
      if (resp.success && resp.user) {
        setCurrentUser(resp.user);
        setCurrentRoute('/setup-internship');
      } else {
        throw new Error(resp.message || 'Registration failed.');
      }
    } catch (e) {
      setAuthLoading(false);
      throw e;
    }
  };

  // Handle Internship Setup Completion
  const handleCompleteInternshipSetup = async (details: InternshipSetupParams) => {
    if (!currentUser) return;
    setAuthLoading(true);
    try {
      const resp = await authService.completeInternshipSetup(currentUser.id, details);
      setAuthLoading(false);
      if (resp.success && resp.user) {
        setCurrentUser(resp.user);

        // Add or update the student record in our repository
        const newRecord: StudentRecord = {
          id: resp.user.id,
          studentId: resp.user.studentId || resp.user.id,
          studentName: resp.user.name,
          email: resp.user.email,
          year: resp.user.year || '3rd Year',
          academicYear: resp.user.year || '3rd Year',
          dept: resp.user.departmentCode || resp.user.dept || 'IT',
          departmentCode: resp.user.departmentCode || resp.user.dept || 'IT',
          company: details.companyName,
          mentor: 'Dr. M. Auxilia',
          mentorId: 'MENTOR001',
          mentorEmail: 'auxilia.mentor@college.edu',
          role: details.internshipRole,
          status: 'onTrack',
          progress: 10,
          hours: 8,
          work: details.description || 'Internship onboarding & setup complete.',
          time: 'Just now',
        };

        const all = internshipRepository.getAllStudentsForAdmin();
        const existingIdx = all.findIndex(s => s.studentId === resp.user!.id || s.id === resp.user!.id);
        if (existingIdx !== -1) {
          all[existingIdx] = newRecord;
          internshipRepository.replaceDataset(all);
        } else {
          internshipRepository.replaceDataset([newRecord, ...all]);
        }
        setDataVersion(v => v + 1);
        setCurrentRoute('/student/dashboard');
      } else {
        throw new Error(resp.message || 'Setup failed.');
      }
    } catch (e) {
      setAuthLoading(false);
      throw e;
    }
  };

  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentRoute('/login');
    setIsQuickSwitchOpen(false);
  };

  // Submit Daily Log for active student via repository
  const handleSubmitDailyWork = async (
    work: string, 
    hours: number, 
    status: StudentRecord['status'], 
    blocker?: string
  ) => {
    if (!currentUser) return;
    setIsSubmittingLog(true);
    try {
      const studentId = currentUser.studentId || currentUser.id;
      internshipRepository.submitStudentDailyLog(studentId, {
        work,
        hours,
        status,
        blocker,
      });
      setDataVersion(v => v + 1);
    } catch (e) {
      console.error('Failed to submit daily log:', e);
    } finally {
      setIsSubmittingLog(false);
    }
  };

  // Handle Admin dataset updates
  const handleAdminUpdateStudents = (updatedStudents: StudentRecord[]) => {
    internshipRepository.replaceDataset(updatedStudents);
    setDataVersion(v => v + 1);
  };

  // ==========================================
  // UN-AUTHENTICATED ROUTE 1: LOGIN PAGE
  // ==========================================
  if (currentRoute === '/login' || (!currentUser && currentRoute !== '/register')) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentRoute('/register')}
          onOpenForgotPassword={() => setIsForgotModalOpen(true)}
          isLoading={authLoading}
        />
        <ForgotPasswordModal
          isOpen={isForgotModalOpen}
          onClose={() => setIsForgotModalOpen(false)}
        />
      </>
    );
  }

  // ==========================================
  // UN-AUTHENTICATED ROUTE 2: REGISTER PAGE
  // ==========================================
  if (currentRoute === '/register') {
    return (
      <RegisterPage
        onRegister={handleRegisterStudent}
        onNavigateToLogin={() => setCurrentRoute('/login')}
        isLoading={authLoading}
      />
    );
  }

  // ==========================================
  // ROUTE 3: INTERNSHIP SETUP (STUDENT ONLY)
  // ==========================================
  if (currentRoute === '/setup-internship' && currentUser && currentUser.role === 'student') {
    return (
      <InternshipSetupPage
        currentUser={currentUser}
        onSubmit={handleCompleteInternshipSetup}
        isLoading={authLoading}
      />
    );
  }

  // ====================================================
  // AUTHENTICATED WORKSPACE (STUDENT, MENTOR, HOD, ADMIN)
  // ====================================================
  return (
    <div className="min-h-screen bg-[#FBF8FF] text-[#1A1B22] font-sans flex flex-col selection:bg-[#DEE0FF]">
      {/* Top Institutional Header */}
      <header className="bg-white border-b border-[#E3E1EA] sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Institution & App Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#24389C] flex items-center justify-center text-white shadow-sm font-bold text-lg">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-lg text-[#1A1B22] tracking-tight">InternPulse</h1>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#DEE0FF] text-[#00105C]">
                    SMVEC
                  </span>
                </div>
                <p className="text-xs text-[#57657A]">Sri Manakula Vinayagar Engineering College</p>
              </div>
            </div>

            {/* Right Header: User Badge + Role Switcher (Prototype Demo) + Logout */}
            <div className="flex items-center space-x-3">
              
              {/* Active User Identity Chip & Quick Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickSwitchOpen(!isQuickSwitchOpen)}
                  className="flex items-center space-x-2 bg-[#EFEDF6] hover:bg-[#E3E1EA] px-3 py-1.5 rounded-xl text-xs transition-all border border-[#E3E1EA]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#24389C] text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser?.name?.slice(0, 1) || 'U'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="font-bold text-[#1A1B22] leading-tight text-xs flex items-center space-x-1">
                      <span>{currentUser?.name}</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-[#DEE0FF] text-[#00105C] rounded">
                        {currentUser?.role}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#57657A]" />
                </button>

                {/* Quick Account Switcher Menu for Testing */}
                {isQuickSwitchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#E3E1EA] shadow-2xl p-2 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-[#E3E1EA] mb-1">
                      <div className="font-bold text-[#1A1B22]">Role Testing Simulator</div>
                      <div className="text-[10px] text-[#57657A]">Instant switch for role-based visibility test</div>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-1">
                      {DEMO_ACCOUNTS.map((acc, i) => {
                        const isCurrent = currentUser?.email === acc.email;
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuickSwitchUser(acc.user)}
                            className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between ${
                              isCurrent ? 'bg-[#24389C] text-white font-bold' : 'hover:bg-[#EFEDF6] text-[#1A1B22]'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{acc.user.name}</div>
                              <div className={`text-[10px] ${isCurrent ? 'text-indigo-100' : 'text-[#57657A]'}`}>
                                {acc.user.id} • {acc.user.dept}
                              </div>
                            </div>
                            <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                              isCurrent ? 'bg-white text-[#24389C]' : 'bg-[#EFEDF6] text-[#57657A]'
                            }`}>
                              {acc.user.role}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Logout from session"
                className="p-2 rounded-xl border border-[#E3E1EA] text-[#57657A] hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-semibold hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ==================================================== */}
        {/* ROLE 1: STUDENT DASHBOARD (STRICT OWN DATA ONLY)     */}
        {/* ==================================================== */}
        {currentUser?.role === 'student' && (
          <StudentDashboard
            currentUser={currentUser}
            studentData={activeStudentData}
            onSubmitDailyLog={handleSubmitDailyWork}
            isSubmitting={isSubmittingLog}
          />
        )}

        {/* ==================================================== */}
        {/* ROLE 2: MENTOR DASHBOARD (STRICT ASSIGNED MENTEES)   */}
        {/* ==================================================== */}
        {currentUser?.role === 'mentor' && (
          <MentorDashboard
            currentUser={currentUser}
            assignedStudents={mentorAssignedStudents}
            onReviewStudent={(studentId, remarks) => {
              console.log(`Mentor remarks for ${studentId}:`, remarks);
            }}
          />
        )}

        {/* ==================================================== */}
        {/* ROLE 3: HOD DASHBOARD (STRICT DEPARTMENT OVERSIGHT)  */}
        {/* ==================================================== */}
        {currentUser?.role === 'hod' && (
          <HodDashboard
            currentUser={currentUser}
            departmentStudents={hodDepartmentStudents}
            departmentMentors={hodDepartmentMentors}
          />
        )}

        {/* ==================================================== */}
        {/* ROLE 4: ADMIN DASHBOARD (COLLEGE-WIDE GOVERNANCE)    */}
        {/* ==================================================== */}
        {currentUser?.role === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            students={totalStudents}
            onUpdateStudents={handleAdminUpdateStudents}
          />
        )}

      </main>
    </div>
  );
}
