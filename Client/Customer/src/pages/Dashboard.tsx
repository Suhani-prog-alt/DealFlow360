import React from 'react';
import { useStore } from '../store';
import KpiCard from '../components/KpiCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const quotations = useStore(s => s.quotations);
  
  const activeCount = quotations.filter(q => q.status !== 'Draft' && q.status !== 'Expired').length;
  const awaitingCount = quotations.filter(q => q.status === 'Awaiting Customer').length;
  const negotiationCount = quotations.filter(q => q.status === 'Under Negotiation').length;
  const acceptedCount = quotations.filter(q => q.status === 'Accepted').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Welcome back to your customer portal.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Active Quotations" value={activeCount.toString().padStart(2, '0')} onClick={() => navigate('/quotations?status=active')} />
        <KpiCard title="Awaiting Response" value={awaitingCount.toString().padStart(2, '0')} onClick={() => navigate('/quotations?status=awaiting_response')} />
        <KpiCard title="Negotiations" value={negotiationCount.toString().padStart(2, '0')} onClick={() => navigate('/quotations?status=under_negotiation')} />
        <KpiCard title="Accepted" value={acceptedCount.toString().padStart(2, '0')} onClick={() => navigate('/quotations?status=accepted')} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Quotations</h2>
          <Link to="/quotations" className="text-[var(--color-accent-green)] hover:underline text-sm font-medium">View All Quotations &rarr;</Link>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-sm">
                <th className="p-4 font-medium">Quote #</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map(q => (
                <tr key={q.id} className="border-b border-[var(--color-border-subtle)] last:border-0 hover:bg-[var(--color-border-subtle)] transition-colors">
                  <td className="p-4">{q.quoteNumber}</td>
                  <td className="p-4">{q.date}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-[var(--color-border-subtle)] text-[var(--color-text-primary)]">
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to={`/quotations/${q.id}`} className="text-[var(--color-accent-green)] hover:underline text-sm font-medium">
                      {q.status === 'Under Negotiation' ? 'Continue Negotiation' : 'View Details'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
