import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DealHealth() {
  const [quotations, setQuotations] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals')
      .then(res => res.json())
      .then(data => setQuotations(data.approvals || []));
  }, []);

  const highRiskQuotes = quotations.filter(q => q.riskScore > 50);
  const warningQuotes = quotations.filter(q => q.riskScore > 30 && q.riskScore <= 50);
  const stalledQuotes = quotations.filter(q => q.status === 'Under Negotiation' || q.status === 'Awaiting Customer');
  const healthyQuotes = quotations.filter(q => q.riskScore <= 30 && !stalledQuotes.includes(q));

  const anomalyQuote = quotations.sort((a, b) => b.totalAmount - a.totalAmount)[0];

  const handleAction = (action: string, id: string) => {
    alert(`${action} successfully triggered for ${id}!`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Deal Health Monitoring</h1>
          <p className="text-textMuted">Identify stalled deals, high-risk quotes, and discount anomalies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="text-sm font-medium text-textMuted mb-2">Healthy</div>
          <div className="text-3xl font-light text-green-400">{healthyQuotes.length}</div>
        </div>
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="text-sm font-medium text-textMuted mb-2">Warning</div>
          <div className="text-3xl font-light text-yellow-400">{warningQuotes.length}</div>
        </div>
        <div className="card p-5 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-sm font-medium text-red-300 mb-2">High Risk</div>
          <div className="text-3xl font-light text-red-400">{highRiskQuotes.length}</div>
        </div>
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="text-sm font-medium text-textMuted mb-2">Stalled</div>
          <div className="text-3xl font-light text-gray-400">{stalledQuotes.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
          <h2 className="text-lg font-medium text-white flex items-center mb-6">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            High Risk Deals
          </h2>
          <div className="space-y-4">
            {highRiskQuotes.map(q => (
              <div key={q.id} className="p-4 bg-[#111] border border-[#333] rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-white">{q.id.split('-')[0]} <span className="text-textMuted font-normal text-sm ml-2">{q.customer}</span></div>
                  <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Risk: {q.riskScore}</div>
                </div>
                <p className="text-sm text-red-300/70 mb-3">Main Reason: System flagged risk score</p>
                <div className="flex space-x-2">
                  <button onClick={() => handleAction('View Quote', q.id)} className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                  <button onClick={() => handleAction('Nudge Rep', q.id)} className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded transition">Nudge Rep</button>
                </div>
              </div>
            ))}
            {highRiskQuotes.length === 0 && <p className="text-textMuted text-sm">No high risk deals found.</p>}
          </div>
        </div>

        <div className="space-y-8">
          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
            <h2 className="text-lg font-medium text-white flex items-center mb-6">
              <Clock className="text-gray-400 mr-2" size={20} />
              Stalled Deals
            </h2>
            <div className="space-y-4">
              {stalledQuotes.map(q => (
                <div key={q.id} className="p-4 bg-[#111] border border-[#333] rounded">
                  <div className="font-medium text-white mb-1">{q.id.split('-')[0]}</div>
                  <div className="text-sm text-textMuted mb-3">Customer: {q.customer}</div>
                  <div className="flex items-center text-sm text-yellow-400/80 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2"></span>
                    Pending Customer Action
                  </div>
                  <div className="text-xs text-textMuted mb-4">Last activity: {new Date(q.createdAt).toLocaleDateString()}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleAction('View Quote', q.id)} className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                    <button onClick={() => handleAction('Escalate', q.id)} className="text-xs border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 px-3 py-1.5 rounded transition">Escalate</button>
                  </div>
                </div>
              ))}
              {stalledQuotes.length === 0 && <p className="text-textMuted text-sm">No stalled deals found.</p>}
            </div>
          </div>

          {anomalyQuote && (
            <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
              <h2 className="text-lg font-medium text-white flex items-center mb-6">
                <TrendingDown className="text-indigo-400 mr-2" size={20} />
                Discount Anomaly
              </h2>
              <div className="p-4 bg-[#111] border border-[#333] rounded">
                <div className="font-medium text-white mb-3">{anomalyQuote.id.split('-')[0]}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-textMuted">Rep average discount:</span>
                    <span className="text-white">8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textMuted">Current quote amount:</span>
                    <span className="text-red-400 font-medium">${anomalyQuote.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400/90 text-xs rounded">
                  ⚠ Unusually high amount for customer
                </div>
                <div className="flex space-x-2 mt-4">
                  <button onClick={() => handleAction('View Quote', anomalyQuote.id)} className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                  <button onClick={() => handleAction('Review Anomaly', anomalyQuote.id)} className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded transition">Review</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
