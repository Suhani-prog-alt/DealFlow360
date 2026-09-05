import { useState } from 'react';
import { Search } from 'lucide-react';

export default function AuditLogs() {
  const [selectedLog, setSelectedLog] = useState<boolean>(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Audit Logs</h1>
          <p className="text-textMuted">View-only, immutable record of all system actions</p>
        </div>
      </div>

      <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search Logs" className="w-full bg-[#111] border border-[#333] rounded pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>User</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Action</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Role</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Date</option>
          </select>
          <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option>Quotation</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Quote</th>
                <th className="px-4 py-3 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[#222] hover:bg-white/5 cursor-pointer">
                <td className="px-4 py-4 text-textMuted">10:20</td>
                <td className="px-4 py-4 text-white">Rahul</td>
                <td className="px-4 py-4 text-textMuted">Sales Rep</td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Submitted</span></td>
                <td className="px-4 py-4 text-white">QT-1024</td>
                <td className="px-4 py-4 text-textMuted">—</td>
              </tr>
              <tr className="border-b border-[#222] hover:bg-white/5 cursor-pointer" onClick={() => setSelectedLog(true)}>
                <td className="px-4 py-4 text-textMuted">10:45</td>
                <td className="px-4 py-4 text-white">Palak</td>
                <td className="px-4 py-4 text-textMuted">Manager</td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Approved</span></td>
                <td className="px-4 py-4 text-white">QT-1024</td>
                <td className="px-4 py-4 text-textMuted">Margin acceptable</td>
              </tr>
              <tr className="border-b border-[#222] hover:bg-white/5 cursor-pointer">
                <td className="px-4 py-4 text-textMuted">11:10</td>
                <td className="px-4 py-4 text-white">Priya</td>
                <td className="px-4 py-4 text-textMuted">Manager</td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Rejected</span></td>
                <td className="px-4 py-4 text-white">QT-1028</td>
                <td className="px-4 py-4 text-textMuted">Discount too high</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Audit Log Detail</h2>
              <button className="text-gray-400 hover:text-white" onClick={() => setSelectedLog(false)}>✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="text-xs text-textMuted mb-1">Action:</div>
                <div className="text-lg font-medium text-green-400">APPROVED</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-textMuted mb-1">User:</div>
                  <div className="text-sm text-white">Palak</div>
                </div>
                <div>
                  <div className="text-xs text-textMuted mb-1">Role:</div>
                  <div className="text-sm text-white">Sales Manager</div>
                </div>
              </div>
              <div className="p-4 bg-[#111] border border-[#333] rounded space-y-4">
                <div>
                  <div className="text-xs text-textMuted mb-1">Previous Status:</div>
                  <div className="text-sm text-yellow-400 font-medium">PENDING_APPROVAL</div>
                </div>
                <div>
                  <div className="text-xs text-textMuted mb-1">New Status:</div>
                  <div className="text-sm text-green-400 font-medium">APPROVED</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-textMuted mb-1">Reason:</div>
                <div className="text-sm text-white p-3 bg-[#111] rounded border border-[#333]">Margin acceptable</div>
              </div>
              <div>
                <div className="text-xs text-textMuted mb-1">Timestamp:</div>
                <div className="text-sm text-textMuted">05 Sep 2026 10:45 AM</div>
              </div>
            </div>
            <div className="p-6 border-t border-[#333] bg-[#111] flex justify-end">
              <button className="btn border border-[#333] text-white hover:bg-[#222] px-4 py-2 rounded text-sm font-medium" onClick={() => setSelectedLog(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
