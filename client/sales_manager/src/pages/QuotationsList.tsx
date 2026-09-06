import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

export default function QuotationsList() {
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [quotations, setQuotations] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals')
      .then(r => r.json())
      .then(d => setQuotations(d.approvals || []));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Quotations</h1>
          <p className="text-textMuted">View-only list of all quotations</p>
        </div>
      </div>

      <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search Quote" className="w-full bg-[#111] border border-[#333] rounded pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Customer</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Sales Rep</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Status</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Risk</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Date</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
                <th className="px-4 py-3 font-medium">Quote ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Risk Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {quotations.map(q => (
                <tr 
                  key={q.id}
                  className="border-b border-[#222] hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedQuote(q)}
                >
                  <td className="px-4 py-4 text-indigo-400 font-medium">{q.id.split('-')[0]}</td>
                  <td className="px-4 py-4 text-white">{q.customer}</td>
                  <td className="px-4 py-4 text-white">${q.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-4"><span className="text-red-400 font-medium">{q.riskScore}</span></td>
                  <td className="px-4 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">{q.status}</span></td>
                </tr>
              ))}
              {quotations.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500">No quotations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail View Modal/Panel */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#333] flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Quotation: {selectedQuote.id.split('-')[0]}</h2>
                <p className="text-sm text-textMuted">Created: {new Date(selectedQuote.createdAt).toLocaleDateString()}</p>
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedQuote(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 bg-[#111] border border-[#333] rounded">
                  <div className="text-xs text-textMuted mb-2">Customer</div>
                  <div className="font-medium text-white">{selectedQuote.customer}</div>
                </div>
                <div className="card p-4 bg-[#111] border border-[#333] rounded">
                  <div className="text-xs text-textMuted mb-2">Financials</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between font-bold pt-2 border-t border-[#333] mt-2"><span className="text-white">Final:</span> <span className="text-white">${selectedQuote.totalAmount.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>

              <div className="card p-4 bg-red-500/10 border border-red-500/20 rounded">
                <h3 className="text-sm font-bold text-red-400 mb-2">Risk Level: {selectedQuote.riskScore > 50 ? 'HIGH' : 'MEDIUM'} ({selectedQuote.riskScore}/100)</h3>
                <ul className="list-disc pl-5 text-sm text-red-300/80 space-y-1">
                  <li>⚠ System flagged risk score</li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#333] bg-[#111] flex justify-end space-x-3">
              <button 
                className="btn border border-[#333] text-white hover:bg-[#222] px-4 py-2 rounded font-medium text-sm"
                onClick={() => setSelectedQuote(null)}
              >
                Close
              </button>
              {selectedQuote.status === 'Pending Approval' ? (
                <>
                  <button className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded font-medium text-sm" onClick={async () => {
                    await fetch(`http://localhost:3001/api/quotations/${selectedQuote.id}/status`, {
                      method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({status: 'Rejected'})
                    });
                    setQuotations(prev => prev.map(q => q.id === selectedQuote.id ? {...q, status: 'Rejected'} : q));
                    alert('Rejected!');
                    setSelectedQuote(null);
                  }}>Reject</button>
                  <button className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded font-medium text-sm" onClick={async () => {
                    await fetch(`http://localhost:3001/api/quotations/${selectedQuote.id}/status`, {
                      method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({status: 'Approved'})
                    });
                    setQuotations(prev => prev.map(q => q.id === selectedQuote.id ? {...q, status: 'Approved'} : q));
                    alert('Approved!');
                    setSelectedQuote(null);
                  }}>Approve</button>
                </>
              ) : (
                <div className="text-sm text-green-400 font-medium py-2">Status: {selectedQuote.status.toUpperCase()}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
