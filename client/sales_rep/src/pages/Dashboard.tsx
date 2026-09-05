import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  pendingApprovals: number;
  openQuotations: number;
  atRiskDeals: number;
  recentActivity: { text: string; time: string }[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // Integrate with the Express backend
    fetch('http://localhost:5005/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Failed to fetch stats", err));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sales dashboard</h1>
        <p className="text-zinc-400">Central hub, links out to every module below</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6 flex flex-col gap-2">
          <h2 className="text-zinc-300 font-medium">Pending approvals</h2>
          <p className="text-4xl font-bold text-[#ff8a65]">
            {stats ? (stats.pendingApprovals < 10 ? `0${stats.pendingApprovals}` : stats.pendingApprovals) : '--'}
          </p>
          <p className="text-sm text-zinc-500">quotations waiting</p>
        </div>
        
        <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6 flex flex-col gap-2">
          <h2 className="text-zinc-300 font-medium">Open quotations</h2>
          <p className="text-4xl font-bold text-white">
            {stats ? stats.openQuotations : '--'}
          </p>
          <p className="text-sm text-zinc-500">active deals</p>
        </div>

        <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6 flex flex-col gap-2">
          <h2 className="text-zinc-300 font-medium">At-risk deals</h2>
          <p className="text-4xl font-bold text-[#e57373]">
            {stats ? (stats.atRiskDeals < 10 ? `0${stats.atRiskDeals}` : stats.atRiskDeals) : '--'}
          </p>
          <p className="text-sm text-zinc-500">flagged by deal health</p>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button 
          onClick={() => navigate('/quotations')}
          className="bg-[#81c784] text-black font-semibold px-6 py-2.5 rounded-md hover:bg-[#6fbf73] transition-colors"
        >
          New quotation
        </button>
        <button 
          onClick={() => navigate('/approvals')}
          className="bg-transparent border border-zinc-700 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-zinc-800 transition-colors"
        >
          View approvals
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent activity</h2>
        <div className="flex flex-col">
          {stats ? stats.recentActivity.map((activity, idx) => (
            <div key={idx} className="flex justify-between items-center py-4 border-b border-zinc-800">
              <p className="text-zinc-300">{activity.text}</p>
              <span className="text-zinc-500 text-sm">{activity.time}</span>
            </div>
          )) : (
            <p className="text-zinc-500 italic py-4">Loading activity feed...</p>
          )}
        </div>
        
        <div className="flex justify-center mt-6">
          <button className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
