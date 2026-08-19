import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Ban, 
  Moon, 
  CheckCheck, 
  Plus, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  FileText, 
  Activity, 
  Layers, 
  Palette, 
  Send, 
  Search, 
  Filter, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Code2,
  Lock,
  Mail,
  UserPlus
} from 'lucide-react';

// Design Token Colors from Google Stitch
const COLORS = {
  primary: '#24389C',
  primaryContainer: '#3F51B5',
  onPrimary: '#FFFFFF',
  secondary: '#515F74',
  secondaryContainer: '#D5E3FC',
  background: '#FBF8FF',
  surface: '#FBF8FF',
  surfaceCard: '#FFFFFF',
  surfaceContainer: '#EFEDF6',
  outlineVariant: '#E3E1EA',
  textPrimary: '#1A1B22',
  textSecondary: '#57657A',
  textMuted: '#757684',
  success: '#10B981',
  successBg: '#D1FAE5',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  error: '#DC2626',
  errorBg: '#FEE2E2',
};

const DEPARTMENTS = [
  { code: 'IT', name: 'Information Technology' },
  { code: 'ECE', name: 'Electronics & Communication' },
  { code: 'EEE', name: 'Electrical & Electronics' },
  { code: 'MECH', name: 'Mechanical Engineering' },
  { code: 'CIVIL', name: 'Civil Engineering' },
  { code: 'BME', name: 'Biomedical Engineering' },
  { code: 'MECT', name: 'Mechatronics Engineering' },
  { code: 'ICE', name: 'Instrumentation & Control' },
  { code: 'CSEBS', name: 'CSE & Business Systems' },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: any; border: string }> = {
  onTrack: { label: 'On Track', bg: 'bg-teal-50 text-teal-700', text: '#0D9488', icon: CheckCircle2, border: 'border-teal-200' },
  inProgress: { label: 'In Progress', bg: 'bg-indigo-50 text-indigo-700', text: '#3F51B5', icon: Activity, border: 'border-indigo-200' },
  delayed: { label: 'Delayed', bg: 'bg-amber-50 text-amber-700', text: '#D97706', icon: Clock, border: 'border-amber-200' },
  blocked: { label: 'Blocked', bg: 'bg-rose-50 text-rose-700', text: '#DC2626', icon: Ban, border: 'border-rose-200' },
  inactive: { label: 'Inactive', bg: 'bg-slate-100 text-slate-700', text: '#64748B', icon: Moon, border: 'border-slate-300' },
  completed: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700', text: '#10B981', icon: CheckCheck, border: 'border-emerald-200' },
};

export default function App() {
  const [activeRole, setActiveRole] = useState<'student' | 'mentor' | 'admin' | 'auth' | 'tokens'>('student');
  const [studentView, setStudentView] = useState<'dashboard' | 'tasks' | 'update'>('dashboard');
  const [mentorView, setMentorView] = useState<'dashboard' | 'monitoring' | 'atRisk' | 'activity'>('dashboard');
  const [adminView, setAdminView] = useState<'dashboard' | 'students' | 'assignments'>('dashboard');
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot' | 'onboarding'>('login');
  
  // Interactive mock state
  const [updates, setUpdates] = useState([
    {
      id: '1',
      studentName: 'Alex Parker',
      dept: 'IT (3rd Year)',
      time: '12 mins ago',
      work: 'Integrated REST endpoints for Cloud Storage and verified upload tokens.',
      status: 'onTrack',
      progress: 68,
      hours: 7.5,
    },
    {
      id: '2',
      studentName: 'Sneha R.',
      dept: 'ECE (4th Year)',
      time: '45 mins ago',
      work: 'Completed PCB schematic review with host industry lead engineer.',
      status: 'onTrack',
      progress: 84,
      hours: 6.0,
    },
    {
      id: '3',
      studentName: 'Karthik V.',
      dept: 'MECH (3rd Year)',
      time: '3 hours ago',
      work: 'Thermal simulation pipeline stalled due to missing ANSYS license key.',
      status: 'blocked',
      progress: 42,
      hours: 4.0,
      blocker: 'Awaiting host company CAD credentials.',
    },
    {
      id: '4',
      studentName: 'Dinesh K.',
      dept: 'CSEBS (3rd Year)',
      time: '2 days ago',
      work: 'No daily log submitted since Friday.',
      status: 'inactive',
      progress: 30,
      hours: 0,
    }
  ]);

  const [formWork, setFormWork] = useState('');
  const [formBlockers, setFormBlockers] = useState('');
  const [formHours, setFormHours] = useState('7.5');
  const [formStatus, setFormStatus] = useState('onTrack');
  const [submittedAlert, setSubmittedAlert] = useState(false);

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formWork) return;
    const newUpdate = {
      id: Date.now().toString(),
      studentName: 'Alex Parker',
      dept: 'IT (3rd Year)',
      time: 'Just now',
      work: formWork,
      status: formStatus,
      progress: 72,
      hours: parseFloat(formHours) || 8,
      blocker: formBlockers || undefined,
    };
    setUpdates([newUpdate, ...updates]);
    setFormWork('');
    setFormBlockers('');
    setSubmittedAlert(true);
    setTimeout(() => {
      setSubmittedAlert(false);
      setStudentView('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FBF8FF] text-[#1A1B22] font-sans flex flex-col selection:bg-[#DEE0FF]">
      {/* Top SMVEC Institutional Header */}
      <header className="bg-white border-b border-[#E3E1EA] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Institution Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#24389C] flex items-center justify-center text-white shadow-sm font-bold text-lg">
                IP
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-lg text-[#1A1B22] tracking-tight">InternPulse</h1>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#DEE0FF] text-[#00105C]">
                    SMVEC Arch
                  </span>
                </div>
                <p className="text-xs text-[#57657A]">Sri Manakula Vinayagar Engineering College</p>
              </div>
            </div>

            {/* Role Navigation Switcher */}
            <div className="flex items-center bg-[#EFEDF6] p-1 rounded-xl border border-[#E3E1EA]">
              <button
                id="role-student-btn"
                onClick={() => setActiveRole('student')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRole === 'student'
                    ? 'bg-white text-[#24389C] shadow-sm'
                    : 'text-[#57657A] hover:text-[#1A1B22]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                id="role-mentor-btn"
                onClick={() => setActiveRole('mentor')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRole === 'mentor'
                    ? 'bg-white text-[#24389C] shadow-sm'
                    : 'text-[#57657A] hover:text-[#1A1B22]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Mentor</span>
              </button>
              <button
                id="role-admin-btn"
                onClick={() => setActiveRole('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRole === 'admin'
                    ? 'bg-white text-[#24389C] shadow-sm'
                    : 'text-[#57657A] hover:text-[#1A1B22]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
              <button
                id="role-auth-btn"
                onClick={() => setActiveRole('auth')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRole === 'auth'
                    ? 'bg-white text-[#24389C] shadow-sm'
                    : 'text-[#57657A] hover:text-[#1A1B22]'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Auth Flow</span>
              </button>
              <button
                id="role-tokens-btn"
                onClick={() => setActiveRole('tokens')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRole === 'tokens'
                    ? 'bg-white text-[#24389C] shadow-sm'
                    : 'text-[#57657A] hover:text-[#1A1B22]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Tokens & Spec</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Screen Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ==================== 1. STUDENT ROLE VIEW ==================== */}
        {activeRole === 'student' && (
          <div className="space-y-6">
            {/* Student Sub-Tabs */}
            <div className="flex items-center justify-between border-b border-[#E3E1EA] pb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setStudentView('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    studentView === 'dashboard'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Dashboard Overview
                </button>
                <button
                  onClick={() => setStudentView('tasks')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    studentView === 'tasks'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Internship Tasks (4)
                </button>
                <button
                  onClick={() => setStudentView('update')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                    studentView === 'update'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Update Progress</span>
                </button>
              </div>

              <div className="text-xs text-[#57657A] flex items-center space-x-1.5 bg-[#EFEDF6] px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Firestore Stream: <strong>Active</strong></span>
              </div>
            </div>

            {studentView === 'dashboard' && (
              <div className="space-y-6">
                {/* Student Hero Info Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#E3E1EA] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#DEE0FF] text-[#00105C] flex items-center justify-center font-bold text-xl">
                      AP
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-[#1A1B22]">Alex Parker</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                          On Track
                        </span>
                      </div>
                      <p className="text-sm text-[#57657A] mt-0.5">
                        SMVEC • IT Dept (3rd Year) • AWS Cloud Architecture Intern
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStudentView('update')}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#24389C] text-white text-sm font-semibold hover:bg-[#1E2E80] transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Log Today's Work
                  </button>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="flex items-center justify-between text-[#57657A] mb-3">
                      <span className="text-xs font-medium">Overall Progress</span>
                      <TrendingUp className="w-4 h-4 text-[#24389C]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1A1B22]">68%</div>
                    <div className="w-full bg-[#EFEDF6] h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-[#24389C] h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="flex items-center justify-between text-[#57657A] mb-3">
                      <span className="text-xs font-medium">Active Tasks</span>
                      <FileText className="w-4 h-4 text-[#515F74]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1A1B22]">4 Active</div>
                    <p className="text-xs text-[#57657A] mt-2">1 Completed this week</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="flex items-center justify-between text-[#57657A] mb-3">
                      <span className="text-xs font-medium">Timeline Remaining</span>
                      <Calendar className="w-4 h-4 text-[#D97706]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1A1B22]">42 Days</div>
                    <p className="text-xs text-[#57657A] mt-2">Target: Nov 30, 2026</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="flex items-center justify-between text-[#57657A] mb-3">
                      <span className="text-xs font-medium">Assigned Mentor</span>
                      <Users className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div className="text-lg font-bold text-[#1A1B22] truncate">Dr. Ramesh K.</div>
                    <p className="text-xs text-[#57657A] mt-1">IT Dept Coordinator</p>
                  </div>
                </div>

                {/* Recent Updates History List */}
                <div className="bg-white rounded-2xl p-6 border border-[#E3E1EA] shadow-sm">
                  <h3 className="font-bold text-base text-[#1A1B22] mb-4">Recent Daily Activity Stream</h3>
                  <div className="space-y-4">
                    {updates.slice(0, 3).map((up) => {
                      const st = STATUS_CONFIG[up.status] || STATUS_CONFIG.onTrack;
                      const Icon = st.icon;
                      return (
                        <div key={up.id} className="p-4 rounded-xl border border-[#E3E1EA] bg-[#FBF8FF] space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${st.bg} border ${st.border} flex items-center space-x-1`}>
                                <Icon className="w-3 h-3" />
                                <span>{st.label}</span>
                              </span>
                              <span className="text-xs text-[#757684]">• {up.time}</span>
                            </div>
                            <span className="text-xs font-semibold text-[#515F74]">{up.hours} hrs logged</span>
                          </div>
                          <p className="text-sm text-[#1A1B22]">{up.work}</p>
                          {up.blocker && (
                            <div className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                              <strong>Blocker:</strong> {up.blocker}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {studentView === 'tasks' && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA]">
                  <h3 className="font-bold text-lg text-[#1A1B22] mb-4">Assigned Milestone Tasks</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'API Gateway & OAuth Proxy Layer', desc: 'Secure backend token forwarder for API calls', due: 'In 2 days', progress: 80, status: 'In Progress' },
                      { title: 'Storage Bucket Integration & Thumbnails', desc: 'Upload document PDFs and auto-render previews', due: 'In 5 days', progress: 40, status: 'In Progress' },
                      { title: 'Firestore Realtime Stream Architecture', desc: 'Set up snapshot listeners for live task feeds', due: 'Completed', progress: 100, status: 'Completed' },
                      { title: 'Final Technical Presentation & Report', desc: 'Prepare final submission to SMVEC internal guide', due: 'Nov 28', progress: 10, status: 'Not Started' },
                    ].map((t, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#E3E1EA] bg-[#FBF8FF]">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-[#1A1B22]">{t.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${t.progress === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'}`}>
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#57657A] mb-3">{t.desc}</p>
                        <div className="flex items-center justify-between text-xs text-[#57657A] mb-1">
                          <span>Progress: {t.progress}%</span>
                          <span>Due: {t.due}</span>
                        </div>
                        <div className="w-full bg-[#E3E1EA] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#24389C] h-full rounded-full" style={{ width: `${t.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {studentView === 'update' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] max-w-2xl mx-auto shadow-sm">
                <h3 className="font-bold text-lg text-[#1A1B22] mb-1">Log Daily Progress Update</h3>
                <p className="text-xs text-[#57657A] mb-5">
                  Submissions stream directly to Dr. Ramesh K. (Faculty Mentor) in real-time.
                </p>

                {submittedAlert && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Progress update submitted and synced to mentor stream!</span>
                  </div>
                )}

                <form onSubmit={handleSubmitUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1B22] mb-1">
                      Work Completed Today <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      value={formWork}
                      onChange={(e) => setFormWork(e.target.value)}
                      placeholder="Describe tickets resolved, code modules deployed, client meetings attended..."
                      rows={4}
                      className="w-full p-3 text-sm rounded-xl border border-[#E3E1EA] focus:outline-none focus:border-[#24389C]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1B22] mb-1">Status Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full p-2.5 text-sm rounded-xl border border-[#E3E1EA] bg-white focus:outline-none focus:border-[#24389C]"
                      >
                        <option value="onTrack">On Track</option>
                        <option value="inProgress">In Progress</option>
                        <option value="delayed">Delayed</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1B22] mb-1">Hours Logged</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formHours}
                        onChange={(e) => setFormHours(e.target.value)}
                        className="w-full p-2.5 text-sm rounded-xl border border-[#E3E1EA] bg-white focus:outline-none focus:border-[#24389C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1B22] mb-1">
                      Blockers / Challenges (Optional)
                    </label>
                    <input
                      type="text"
                      value={formBlockers}
                      onChange={(e) => setFormBlockers(e.target.value)}
                      placeholder="Technical blockers, missing approvals, credential issues..."
                      className="w-full p-2.5 text-sm rounded-xl border border-[#E3E1EA] focus:outline-none focus:border-[#24389C]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setStudentView('dashboard')}
                      className="px-4 py-2 text-sm font-semibold rounded-xl text-[#57657A] hover:bg-[#EFEDF6]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#24389C] text-white hover:bg-[#1E2E80] flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Update</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. MENTOR ROLE VIEW ==================== */}
        {activeRole === 'mentor' && (
          <div className="space-y-6">
            {/* Mentor Sub-Navigation */}
            <div className="flex items-center justify-between border-b border-[#E3E1EA] pb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setMentorView('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    mentorView === 'dashboard'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Cohort Dashboard
                </button>
                <button
                  onClick={() => setMentorView('monitoring')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    mentorView === 'monitoring'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Student Monitoring (24)
                </button>
                <button
                  onClick={() => setMentorView('atRisk')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                    mentorView === 'atRisk'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>At-Risk Students (2)</span>
                </button>
                <button
                  onClick={() => setMentorView('activity')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    mentorView === 'activity'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Live Activity Feed
                </button>
              </div>

              <div className="text-xs text-[#57657A]">
                SMVEC Department: <strong>Information Technology</strong>
              </div>
            </div>

            {mentorView === 'dashboard' && (
              <div className="space-y-6">
                {/* Cohort Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Assigned Students</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">24 Students</div>
                    <p className="text-xs text-emerald-600 font-semibold mt-2">22 Active updates today</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Average Progress</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">74.5%</div>
                    <p className="text-xs text-[#57657A] mt-2">Target curve: 70%</p>
                  </div>
                  <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm">
                    <div className="text-xs font-medium text-rose-800 mb-2">At-Risk Alerts</div>
                    <div className="text-2xl font-bold text-rose-900">2 Students</div>
                    <p className="text-xs text-rose-700 font-semibold mt-2">1 Blocked, 1 Inactive (3d+)</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Pending Reviews</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">5 Logs</div>
                    <p className="text-xs text-indigo-600 font-semibold mt-2">Real-time sync on</p>
                  </div>
                </div>

                {/* Live Activity Stream */}
                <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-[#1A1B22]">Live Submissions Feed (SMVEC IT Cohort)</h3>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      Real-time listening
                    </span>
                  </div>
                  <div className="divide-y divide-[#E3E1EA]">
                    {updates.map((item) => {
                      const st = STATUS_CONFIG[item.status] || STATUS_CONFIG.onTrack;
                      const Icon = st.icon;
                      return (
                        <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-[#DEE0FF] text-[#00105C] flex items-center justify-center font-bold text-xs mt-0.5">
                              {item.studentName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-sm text-[#1A1B22]">{item.studentName}</span>
                                <span className="text-xs text-[#57657A]">({item.dept})</span>
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${st.bg} border ${st.border} flex items-center space-x-1`}>
                                  <Icon className="w-2.5 h-2.5" />
                                  <span>{st.label}</span>
                                </span>
                              </div>
                              <p className="text-xs text-[#1A1B22] mt-1">{item.work}</p>
                              {item.blocker && (
                                <p className="text-xs text-rose-700 font-medium mt-1 bg-rose-50 p-1.5 rounded border border-rose-200">
                                  Blocked: {item.blocker}
                                </p>
                              )}
                              <span className="text-[11px] text-[#757684] mt-1 inline-block">{item.time} • {item.hours} hrs logged</span>
                            </div>
                          </div>

                          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E3E1EA] text-[#24389C] hover:bg-[#DEE0FF] whitespace-nowrap">
                            Review / Feedback
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {mentorView === 'atRisk' && (
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-rose-700 font-bold text-base">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Centralized At-Risk Detection (SMVEC Monitoring Rules)</span>
                </div>
                <p className="text-xs text-[#57657A]">
                  Triggered by rule engine: Inactive ≥ 3 consecutive days, Blocked task reported, or linear progress &lt; 20% expected.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-rose-900">Karthik V. (MECH - 3rd Year)</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-200 text-rose-800">
                          Blocked Status
                        </span>
                      </div>
                      <p className="text-xs text-rose-800 mt-1">
                        Reason: Host company CAD software license access denied.
                      </p>
                      <p className="text-[11px] text-[#757684] mt-1">Reported 3 hours ago</p>
                    </div>
                    <button className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700">
                      Contact Industry Mentor
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-amber-900">Dinesh K. (CSEBS - 3rd Year)</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
                          Inactive (3 Days)
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1">
                        No daily work log or attendance timestamp logged since Friday.
                      </p>
                      <p className="text-[11px] text-[#757684] mt-1">Last seen: 72 hours ago</p>
                    </div>
                    <button className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700">
                      Send SMS Reminder
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(mentorView === 'monitoring' || mentorView === 'activity') && (
              <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA]">
                <h3 className="font-bold text-base text-[#1A1B22] mb-4">Complete Student Cohort Directory (24 Interns)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E3E1EA] text-[#57657A]">
                        <th className="pb-3 font-semibold">Student Name</th>
                        <th className="pb-3 font-semibold">Department</th>
                        <th className="pb-3 font-semibold">Host Organization</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Progress</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3E1EA]">
                      {[
                        { name: 'Alex Parker', dept: 'IT', org: 'Amazon Web Services', status: 'onTrack', prog: '68%' },
                        { name: 'Sneha R.', dept: 'ECE', org: 'Qualcomm India', status: 'onTrack', prog: '84%' },
                        { name: 'Karthik V.', dept: 'MECH', org: 'Tata Motors', status: 'blocked', prog: '42%' },
                        { name: 'Dinesh K.', dept: 'CSEBS', org: 'TCS Innovation Labs', status: 'inactive', prog: '30%' },
                        { name: 'Pooja M.', dept: 'BME', org: 'Apollo TeleHealth', status: 'onTrack', prog: '91%' },
                      ].map((st, i) => (
                        <tr key={i} className="hover:bg-[#FBF8FF]">
                          <td className="py-3 font-semibold text-[#1A1B22]">{st.name}</td>
                          <td className="py-3 text-[#57657A]">{st.dept}</td>
                          <td className="py-3 text-[#57657A]">{st.org}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full font-semibold ${STATUS_CONFIG[st.status].bg}`}>
                              {STATUS_CONFIG[st.status].label}
                            </span>
                          </td>
                          <td className="py-3 font-semibold text-[#1A1B22]">{st.prog}</td>
                          <td className="py-3 text-right">
                            <button className="text-[#24389C] font-semibold hover:underline">View History</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. ADMIN ROLE VIEW ==================== */}
        {activeRole === 'admin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E3E1EA] pb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setAdminView('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    adminView === 'dashboard'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Institution Overview
                </button>
                <button
                  onClick={() => setAdminView('students')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    adminView === 'students'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Student Management
                </button>
                <button
                  onClick={() => setAdminView('assignments')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    adminView === 'assignments'
                      ? 'bg-[#3F51B5] text-white shadow-sm'
                      : 'text-[#57657A] hover:bg-[#EFEDF6]'
                  }`}
                >
                  Mentor Assignment Matrix
                </button>
              </div>

              <div className="text-xs text-[#57657A]">
                College: <strong>Sri Manakula Vinayagar Engineering College</strong>
              </div>
            </div>

            {adminView === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Total Enrolled Interns</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">420 Students</div>
                    <p className="text-xs text-[#57657A] mt-2">Across 9 SMVEC Departments</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Faculty Mentors</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">36 Faculty</div>
                    <p className="text-xs text-emerald-600 font-semibold mt-2">Avg 11.6 students/mentor</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Departments Active</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">9 Departments</div>
                    <p className="text-xs text-[#57657A] mt-2">IT, ECE, EEE, MECH, CIVIL...</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E3E1EA] shadow-sm">
                    <div className="text-xs font-medium text-[#57657A] mb-2">Active Completion Rate</div>
                    <div className="text-2xl font-bold text-[#1A1B22]">94.2%</div>
                    <p className="text-xs text-teal-600 font-semibold mt-2">+2.4% vs last academic year</p>
                  </div>
                </div>

                {/* Department Matrix Grid */}
                <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
                  <h3 className="font-bold text-base text-[#1A1B22] mb-4">SMVEC Department Wise Enrollment</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DEPARTMENTS.map((dept) => (
                      <div key={dept.code} className="p-3.5 rounded-xl border border-[#E3E1EA] bg-[#FBF8FF] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-[#1A1B22]">{dept.code}</div>
                          <div className="text-xs text-[#57657A]">{dept.name}</div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-white rounded-lg border border-[#E3E1EA] text-[#24389C]">
                          {Math.floor(dept.code.length * 12 + 18)} Interns
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminView === 'assignments' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-[#1A1B22]">Mentor-to-Student Assignment Matrix</h3>
                  <button className="text-xs font-semibold px-3 py-1.5 bg-[#24389C] text-white rounded-lg">
                    + Auto-Assign Unallocated Students
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { mentor: 'Dr. Ramesh K.', dept: 'IT', count: 5, capacity: 5, status: 'Full Capacity' },
                    { mentor: 'Prof. Anitha S.', dept: 'ECE', count: 4, capacity: 5, status: '1 Slot Open' },
                    { mentor: 'Dr. Vignesh M.', dept: 'MECH', count: 3, capacity: 5, status: '2 Slots Open' },
                    { mentor: 'Dr. Priya D.', dept: 'CSEBS', count: 5, capacity: 5, status: 'Full Capacity' },
                  ].map((row, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E3E1EA] bg-[#FBF8FF] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm text-[#1A1B22]">{row.mentor}</div>
                        <div className="text-xs text-[#57657A]">Department: {row.dept} • Assigned: {row.count}/{row.capacity} students</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${row.count === row.capacity ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminView === 'students' && (
              <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
                <h3 className="font-bold text-base text-[#1A1B22] mb-3">Institutional Student Directory</h3>
                <p className="text-xs text-[#57657A] mb-4">Search and filter across all 9 departments.</p>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search by student register number or name..."
                    className="flex-1 p-2 text-xs rounded-lg border border-[#E3E1EA]"
                  />
                  <select className="p-2 text-xs rounded-lg border border-[#E3E1EA] bg-white">
                    <option>All Departments</option>
                    {DEPARTMENTS.map(d => <option key={d.code}>{d.code}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 4. AUTH FLOW PREVIEW ==================== */}
        {activeRole === 'auth' && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm space-y-6">
            <div className="flex justify-center space-x-2 border-b border-[#E3E1EA] pb-3">
              <button
                onClick={() => setAuthView('login')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${authView === 'login' ? 'bg-[#24389C] text-white' : 'text-[#57657A]'}`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthView('register')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${authView === 'register' ? 'bg-[#24389C] text-white' : 'text-[#57657A]'}`}
              >
                Register
              </button>
              <button
                onClick={() => setAuthView('onboarding')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${authView === 'onboarding' ? 'bg-[#24389C] text-white' : 'text-[#57657A]'}`}
              >
                Onboarding
              </button>
            </div>

            {authView === 'login' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#24389C] text-white flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    IP
                  </div>
                  <h3 className="font-bold text-lg text-[#1A1B22]">Sign In to InternPulse</h3>
                  <p className="text-xs text-[#57657A]">Sri Manakula Vinayagar Engineering College</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1A1B22] mb-1">SMVEC Institutional Email</label>
                    <input type="email" placeholder="name@smvec.ac.in" className="w-full p-2.5 text-sm rounded-xl border border-[#E3E1EA]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1B22] mb-1">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-2.5 text-sm rounded-xl border border-[#E3E1EA]" />
                  </div>
                  <button
                    onClick={() => setActiveRole('student')}
                    className="w-full py-2.5 bg-[#24389C] text-white rounded-xl text-sm font-semibold hover:bg-[#1E2E80]"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {authView === 'register' && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-[#1A1B22]">Create Account</h3>
                  <p className="text-xs text-[#57657A]">Select your role and department</p>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-1.5 text-xs font-semibold rounded-lg bg-[#DEE0FF] text-[#00105C] border border-[#BAC3FF]">
                      Student
                    </button>
                    <button className="py-1.5 text-xs font-semibold rounded-lg bg-[#EFEDF6] text-[#57657A]">
                      Faculty Mentor
                    </button>
                  </div>
                  <input type="text" placeholder="Full Name" className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA]" />
                  <input type="email" placeholder="Institutional Email" className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA]" />
                  <select className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA] bg-white">
                    {DEPARTMENTS.map(d => <option key={d.code}>{d.code} - {d.name}</option>)}
                  </select>
                  <button
                    onClick={() => setAuthView('onboarding')}
                    className="w-full py-2 bg-[#24389C] text-white rounded-xl text-xs font-semibold"
                  >
                    Proceed to Onboarding
                  </button>
                </div>
              </div>
            )}

            {authView === 'onboarding' && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-[#1A1B22]">Host Internship Setup</h3>
                  <p className="text-xs text-[#57657A]">Link your industry host organization</p>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="Host Company Name (e.g. AWS, TCS)" className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA]" />
                  <input type="text" placeholder="Internship Role (e.g. Cloud Engineer)" className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA]" />
                  <input type="date" className="w-full p-2 text-xs rounded-lg border border-[#E3E1EA]" />
                  <button
                    onClick={() => { setActiveRole('student'); setStudentView('dashboard'); }}
                    className="w-full py-2 bg-[#24389C] text-white rounded-xl text-xs font-semibold"
                  >
                    Finish Setup & Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 5. DESIGN TOKENS & ARCHITECTURE ==================== */}
        {activeRole === 'tokens' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
              <h3 className="font-bold text-lg text-[#1A1B22] mb-1">Google Stitch Design System & Flutter Tokens</h3>
              <p className="text-xs text-[#57657A] mb-6">
                Material 3 design token definitions implemented in <code>lib/core/theme/color_schemes.dart</code>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-3 rounded-xl border border-[#E3E1EA]" style={{ backgroundColor: '#24389C', color: 'white' }}>
                  <div className="font-bold text-xs">Primary</div>
                  <div className="text-[11px] opacity-80">#24389C</div>
                </div>
                <div className="p-3 rounded-xl border border-[#E3E1EA]" style={{ backgroundColor: '#3F51B5', color: 'white' }}>
                  <div className="font-bold text-xs">Primary Container</div>
                  <div className="text-[11px] opacity-80">#3F51B5</div>
                </div>
                <div className="p-3 rounded-xl border border-[#E3E1EA]" style={{ backgroundColor: '#DEE0FF', color: '#00105C' }}>
                  <div className="font-bold text-xs">Primary Fixed</div>
                  <div className="text-[11px] opacity-80">#DEE0FF</div>
                </div>
                <div className="p-3 rounded-xl border border-[#E3E1EA]" style={{ backgroundColor: '#FBF8FF', color: '#1A1B22' }}>
                  <div className="font-bold text-xs">Surface / Background</div>
                  <div className="text-[11px] opacity-80">#FBF8FF</div>
                </div>
              </div>

              <h4 className="font-bold text-sm text-[#1A1B22] mb-3">Status System Semantic Badges</h4>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {Object.entries(STATUS_CONFIG).map(([key, val]) => {
                  const Icon = val.icon;
                  return (
                    <div key={key} className={`p-2.5 rounded-xl border ${val.border} ${val.bg} flex flex-col items-center justify-center text-center`}>
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-xs font-semibold">{val.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3E1EA] shadow-sm">
              <h4 className="font-bold text-sm text-[#1A1B22] mb-2">Target Academic Institution Specification</h4>
              <p className="text-xs text-[#57657A] mb-4">Sri Manakula Vinayagar Engineering College (SMVEC)</p>
              <div className="grid grid-cols-3 gap-2">
                {DEPARTMENTS.map(d => (
                  <div key={d.code} className="p-2.5 rounded-lg bg-[#EFEDF6] text-xs">
                    <strong>{d.code}</strong>: {d.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3E1EA] bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#57657A]">
          InternPulse • Sri Manakula Vinayagar Engineering College • Architecture & Design System
        </div>
      </footer>
    </div>
  );
}
