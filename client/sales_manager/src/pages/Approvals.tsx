import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import { Check, X, CornerDownLeft } from 'lucide-react';

function PendingApprovals() {
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals')
      .then(r => r.json())
      .then(d => setApprovals(d.approvals || []));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-white">Pending Approvals: {approvals.length}</h2>
      </div>

      <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
              <th className="px-4 py-3 font-medium">Quote ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Risk Score</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Total Amount</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {approvals.map(approval => (
              <tr key={approval.id} className="border-b border-[#222] hover:bg-white/5">
                <td className="px-4 py-4 text-indigo-400 font-medium">{approval.id.split('-')[0]}...</td>
                <td className="px-4 py-4 text-white">{approval.customer}</td>
                <td className="px-4 py-4"><span className="text-red-400 font-medium">{approval.riskScore}</span></td>
                <td className="px-4 py-4 text-textMuted">{approval.status}</td>
                <td className="px-4 py-4 text-white">${approval.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => setSelectedQuote(approval)}
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {approvals.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">No pending approvals!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-full max-w-3xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#333] flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Review {selectedQuote.id.split('-')[0]}</h2>
                <p className="text-sm text-textMuted">Requested for {selectedQuote.customer}</p>
              </div>
              <button className="text-gray-400 hover:text-white" onClick={() => setSelectedQuote(null)}>✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="card bg-[#111] border border-[#333] p-5 rounded">
                <h3 className="text-sm font-medium text-white mb-4">Risk Analysis</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-textMuted mb-1">Total Amount</div>
                    <div className="text-xl font-medium text-white">${selectedQuote.totalAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-textMuted mb-1">Blended Risk Score</div>
                    <div className="text-xl font-medium text-red-400">{selectedQuote.riskScore}</div>
                  </div>
                </div>
              </div>

              <div className="card bg-[#111] border border-[#333] p-5 rounded">
                <h3 className="text-sm font-medium text-white mb-4">Approval Chain</h3>
                <div className="space-y-4 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#333]">
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-textMuted line-through">Sales Rep submitted</span>
                  </div>
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center border border-indigo-400">
                      <span className="text-xs">●</span>
                    </div>
                    <span className="text-sm text-white font-medium">Sales Manager <span className="text-indigo-400 text-xs ml-2">← YOU</span></span>
                  </div>
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-[#222] text-gray-500 flex items-center justify-center border border-[#444]">
                      <span className="text-xs">○</span>
                    </div>
                    <span className="text-sm text-textMuted">Finance</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Reason (Required for Reject/Revision)</label>
                <textarea 
                  className="w-full bg-[#111] border border-[#333] rounded-md p-3 text-sm text-white focus:outline-none focus:border-indigo-500" 
                  rows={3} 
                  placeholder="Enter your justification here..."
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-[#333] bg-[#111] flex justify-end space-x-3">
              <button className="btn bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded font-medium text-sm flex items-center" onClick={() => { alert('Returned for revision'); setSelectedQuote(null); }}>
                <CornerDownLeft size={16} className="mr-2" /> Return for Revision
              </button>
              <button className="btn bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded font-medium text-sm flex items-center" onClick={async () => { 
                await fetch(`http://localhost:3001/api/quotations/${selectedQuote.id}/status`, {
                  method: 'PATCH',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({status: 'Rejected'})
                });
                setApprovals(prev => prev.filter(a => a.id !== selectedQuote.id));
                alert('Rejected!'); 
                setSelectedQuote(null); 
              }}>
                <X size={16} className="mr-2" /> Reject
              </button>
              <button className="btn bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded font-medium text-sm flex items-center" onClick={async () => { 
                await fetch(`http://localhost:3001/api/quotations/${selectedQuote.id}/status`, {
                  method: 'PATCH',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({status: 'Approved'})
                });
                setApprovals(prev => prev.filter(a => a.id !== selectedQuote.id));
                alert('Approved successfully!'); 
                setSelectedQuote(null); 
              }}>
                <Check size={16} className="mr-2" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ApprovedList() {
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals?status=approved')
      .then(r => r.json())
      .then(d => setApprovals(d.approvals || []));
  }, []);

  return (
    <div className="space-y-6">
      {approvals.map(a => (
        <div key={a.id} className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-indigo-400 mb-1">{a.id.split('-')[0]}</h3>
              <p className="text-sm text-white">Customer: {a.customer}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-textMuted mb-1">Approved at: {new Date(a.createdAt).toLocaleTimeString()}</div>
              <div className="text-xs text-textMuted">Approved by: You</div>
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <div><span className="text-textMuted">Amount:</span> <span className="text-white">${a.totalAmount.toFixed(2)}</span></div>
            <div><span className="text-textMuted">Risk Score:</span> <span className="text-yellow-400">{a.riskScore}</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#333]">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View details</button>
          </div>
        </div>
      ))}
      {approvals.length === 0 && (
        <p className="text-center text-zinc-500 py-8">No approved quotes yet.</p>
      )}
    </div>
  );
}

function RejectedList() {
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals?status=rejected')
      .then(r => r.json())
      .then(d => setApprovals(d.approvals || []));
  }, []);

  return (
    <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
            <th className="px-4 py-3 font-medium">Quote ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Risk Score</th>
            <th className="px-4 py-3 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {approvals.map(a => (
            <tr key={a.id} className="border-b border-[#222] hover:bg-white/5">
              <td className="px-4 py-4 text-white font-medium">{a.id.split('-')[0]}</td>
              <td className="px-4 py-4 text-textMuted">{a.customer}</td>
              <td className="px-4 py-4 text-red-400">{a.riskScore}</td>
              <td className="px-4 py-4 text-white">${a.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
          {approvals.length === 0 && (
            <tr><td colSpan={4} className="px-4 py-8 text-center text-zinc-500">No rejected quotes yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ApprovalHistory() {
  return (
    <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-6 max-w-2xl">
      <h3 className="text-lg font-medium text-white mb-6">Timeline: QT-1024</h3>
      <div className="space-y-6 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#333]">
        
        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:20</div>
          <div className="text-sm text-white">Sales Rep submitted quotation</div>
        </div>

        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:21</div>
          <div className="text-sm text-white">System calculated Risk Score: <span className="text-red-400 font-medium">78</span></div>
        </div>

        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:21</div>
          <div className="text-sm text-white">Manager approval requested</div>
        </div>

        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:45</div>
          <div className="text-sm text-white">Manager reviewed quotation</div>
        </div>

        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:47</div>
          <div className="text-sm text-green-400 font-medium">Manager approved</div>
        </div>

        <div className="relative pl-6 z-10">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-500"></div>
          <div className="text-xs text-textMuted mb-1">05 Sep 10:47</div>
          <div className="text-sm text-textMuted">Audit log created</div>
        </div>

      </div>
    </div>
  );
}

export default function Approvals() {
  const location = useLocation();

  const tabs = [
    { name: 'Pending', path: '/approvals/pending' },
    { name: 'Approved', path: '/approvals/approved' },
    { name: 'Rejected', path: '/approvals/rejected' },
    { name: 'History', path: '/approvals/history' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Approval Management</h1>
          <p className="text-textMuted">Review and action high-risk quotations</p>
        </div>
      </div>

      <div className="border-b border-[#333]">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={clsx(
                  "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-textMuted hover:text-white hover:border-gray-500"
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Navigate to="pending" replace />} />
          <Route path="pending" element={<PendingApprovals />} />
          <Route path="approved" element={<ApprovedList />} />
          <Route path="rejected" element={<RejectedList />} />
          <Route path="history" element={<ApprovalHistory />} />
        </Routes>
      </div>
    </div>
  );
}
