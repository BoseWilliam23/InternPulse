import React, { useState } from 'react';
import { X, Mail, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E1EA] animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E1EA]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#24389C] text-white flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#1A1B22]">Forgot Password</h3>
          </div>
          <button
            onClick={() => { setSubmitted(false); onClose(); }}
            className="p-1 rounded-lg text-[#757684] hover:bg-[#EFEDF6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
            <p className="text-[#57657A] leading-relaxed">
              Enter your registered SMVEC institutional email address or student ID to verify account recovery.
            </p>

            <div>
              <label className="block font-semibold text-[#1A1B22] mb-1.5">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#757684] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@internpulse.demo or your.email@smvec.ac.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E3E1EA] focus:outline-none focus:border-[#24389C] text-xs"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Prototype Environment Note:</strong> Password reset with dynamic email dispatch will be handled via Firebase Authentication in the production release.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#57657A] hover:bg-[#EFEDF6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#24389C] text-white hover:bg-[#1E2E80]"
              >
                Reset Password
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 mt-4 text-xs">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-900">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Password Recovery Request Recorded</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                "Password reset is available in the production Firebase authentication version."
              </p>
              <div className="pt-2 border-t border-amber-200/60 font-mono text-[11px]">
                Target: {email}
              </div>
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="w-full py-2.5 rounded-xl bg-[#24389C] text-white font-semibold text-xs hover:bg-[#1E2E80]"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
