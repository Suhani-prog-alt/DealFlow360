import React, { useState, useEffect } from 'react';
import { ChevronDown, Lock, Mail, ShieldAlert } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('john.sales@dealflow360.com');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState('sales_rep');
  const [loginType, setLoginType] = useState('head');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const roleParam = urlParams.get('role');
    if (token) {
      localStorage.setItem('jwt_token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
      onLogin(roleParam || 'user');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('jwt_token', data.token);
        
        // Port mapping for our different frontends
        const portMap: Record<string, string> = {
          'sales_rep': '5173',
          'admin': '5174',
          'finance': '5175',
          'sales_manager': '5176',
          'customer': '5177'
        };
        
        const currentPort = window.location.port;
        const targetPort = portMap[role];
        
        if (targetPort && currentPort !== targetPort) {
          // Redirect them to the correct frontend app!
          window.location.href = `http://localhost:${targetPort}/?token=${data.token}&role=${role}`;
          return;
        }

        onLogin(role);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111412] flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1f2921] via-[#111412] to-[#111412]">
      <div className="bg-[#1a1f1b] border border-zinc-800/80 rounded-3xl w-full max-w-md p-10 shadow-[0_0_50px_rgba(129,199,132,0.05)] relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#81c784] to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#81c784]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#81c784] to-[#aed581] mb-2 tracking-tight">DealFlow360</h1>
          <p className="text-zinc-400 font-medium">Enterprise Sales Platform</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <ShieldAlert className="text-red-400 shrink-0 mt-0.5" size={18} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="flex bg-[#111412] p-1 rounded-xl mb-6 border border-zinc-800/80">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginType === 'head' ? 'bg-[#1a1f1b] text-[#81c784] shadow-md border border-zinc-700/80' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => { setLoginType('head'); setRole('sales_rep'); }}
            >
              Staff Member
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginType === 'customer' ? 'bg-[#1a1f1b] text-[#81c784] shadow-md border border-zinc-700/80' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => { setLoginType('customer'); setRole('customer'); }}
            >
              Customer Portal
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-zinc-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111412] border border-zinc-700/80 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-[#81c784] focus:ring-1 focus:ring-[#81c784] transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-zinc-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111412] border border-zinc-700/80 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-[#81c784] focus:ring-1 focus:ring-[#81c784] transition-all"

                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {loginType === 'head' && (
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-zinc-300">Select Role</label>
              <div className="relative">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#111412] border border-zinc-700/80 rounded-xl px-4 py-3 text-white outline-none focus:border-[#81c784] focus:ring-1 focus:ring-[#81c784] transition-all appearance-none cursor-pointer"
                >
                  <option value="sales_rep">Sales Representative</option>
                  <option value="sales_manager">Sales Manager</option>
                  <option value="finance">Finance Team</option>
                  <option value="admin">System Admin</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#81c784] to-[#6fbf73] text-black font-bold py-3.5 rounded-xl mt-4 hover:opacity-90 transition-opacity flex justify-center items-center shadow-[0_0_20px_rgba(129,199,132,0.2)] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500/80 font-medium">Secured via JWT & bcrypt verification</p>
        </div>
      </div>
    </div>
  );
}
