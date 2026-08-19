import React, { useState } from 'react';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { DEMO_ACCOUNTS } from '../core/auth/demoAccounts';

interface LoginPageProps {
  onLogin: (emailOrId: string, password: string) => Promise<void>;
  onNavigateToRegister: () => void;
  onOpenForgotPassword: () => void;
  isLoading: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigateToRegister,
  onOpenForgotPassword,
  isLoading,
}) => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'mentor' | 'hod' | 'student' | 'admin'>('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!emailOrId.trim()) {
      setError('Please enter your Email or User ID.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      await onLogin(emailOrId, password);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify and try again.');
    }
  };

  const fillDemoCredentials = (email: string, pass: string) => {
    setEmailOrId(email);
    setPassword(pass);
    setError(null);
  };

  const filteredAccounts = DEMO_ACCOUNTS.filter((acc) => {
    if (activeCategory === 'all') return true;
    return acc.user.role === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FBF8FF] flex flex-col justify-center items-center px-4 py-8 selection:bg-[#DEE0FF]">
      <div className="max-w-lg w-full">
        
        {/* Institutional Branding */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#24389C] rounded-2xl flex items-center justify-center text-white mx-auto shadow-md mb-3">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1B22] tracking-tight">InternPulse</h1>
          <p className="text-xs text-[#57657A] font-medium mt-1">
            Sri Manakula Vinayagar Engineering College (SMVEC)
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E3E1EA] shadow-xl">
          <div className="mb-6 border-b border-[#E3E1EA] pb-4">
            <h2 className="text-xl font-bold text-[#1A1B22]">Welcome Back</h2>
            <p className="text-xs text-[#57657A] mt-0.5">
              Sign in with your SMVEC Mentor, HOD, or Student ID
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email / User ID */}
            <div>
              <label className="block font-semibold text-[#1A1B22] mb-1.5">
                Email / Mentor ID / Student ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#757684] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  placeholder="e.g. auxilia.mentor@college.edu or MENTOR001"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E3E1EA] focus:outline-none focus:border-[#24389C] text-xs bg-[#FBF8FF]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#1A1B22]">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-xs font-semibold text-[#24389C] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#757684] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E3E1EA] focus:outline-none focus:border-[#24389C] text-xs bg-[#FBF8FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#757684] hover:text-[#1A1B22]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#24389C] hover:bg-[#1E2E80] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Credential Selectors */}
          <div className="mt-6 pt-5 border-t border-[#E3E1EA]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#57657A] uppercase tracking-wider">
                Official Demo Credentials:
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Click any account to auto-fill
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 mb-3 bg-[#EFEDF6] p-1 rounded-xl text-[11px]">
              {[
                { id: 'all', label: 'All' },
                { id: 'mentor', label: '👨‍🏫 Mentors (7)' },
                { id: 'hod', label: '🏛️ HOD' },
                { id: 'student', label: '🎓 Student' },
                { id: 'admin', label: '⚡ Admin' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-white text-[#24389C] shadow-xs'
                      : 'text-[#57657A] hover:text-[#1A1B22]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Account Buttons Grid */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemoCredentials(acc.email, acc.password)}
                  className="w-full p-2.5 text-left bg-[#FBF8FF] hover:bg-[#DEE0FF]/40 rounded-xl border border-[#E3E1EA] hover:border-[#24389C] transition-all flex items-center justify-between group"
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-xs text-[#1A1B22] flex items-center space-x-1.5">
                      <span className="truncate">{acc.user.name}</span>
                      <span className="text-[10px] font-mono text-[#57657A] bg-white px-1.5 py-0.2 rounded border border-[#E3E1EA]">
                        {acc.user.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#57657A] truncate font-mono mt-0.5">
                      {acc.email}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      acc.user.role === 'hod' ? 'bg-amber-100 text-amber-800' :
                      acc.user.role === 'mentor' ? 'bg-indigo-100 text-indigo-800' :
                      acc.user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {acc.user.role.toUpperCase()}
                    </span>
                    <div className="text-[9px] text-[#757684] mt-0.5 font-mono">
                      {acc.password}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Register Prompt */}
          <div className="text-center mt-6 pt-4 border-t border-[#E3E1EA]">
            <p className="text-xs text-[#57657A]">
              Are you a new student?{' '}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="font-bold text-[#24389C] hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
