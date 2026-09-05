import { FileText, AlertTriangle, CheckCircle, Clock, Scale } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Sales Manager Dashboard</h1>
          <p className="text-textMuted">Overview of your team's deals and required approvals</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium text-textMuted">Pending Approvals</div>
            <Clock size={20} className="text-yellow-500" />
          </div>
          <div className="text-4xl font-light text-white mb-1">08</div>
          <div className="text-xs text-yellow-500">Action required</div>
        </div>
        
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium text-textMuted">High Risk Deals</div>
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div className="text-4xl font-light text-white mb-1">03</div>
          <div className="text-xs text-red-500">Score &gt; 75</div>
        </div>
        
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium text-textMuted">Approved Today</div>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="text-4xl font-light text-white mb-1">12</div>
          <div className="text-xs text-green-500">+3 from yesterday</div>
        </div>
        
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium text-textMuted">Revision Required</div>
            <FileText size={20} className="text-blue-500" />
          </div>
          <div className="text-4xl font-light text-white mb-1">04</div>
          <div className="text-xs text-blue-500">Awaiting rep action</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Approval Overview</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
                  <th className="px-4 py-3 font-medium">Quote</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Rep</th>
                  <th className="px-4 py-3 font-medium">Discount</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#222] hover:bg-white/5">
                  <td className="px-4 py-4 text-white font-medium">QT-1024</td>
                  <td className="px-4 py-4 text-textMuted">Acme Corp</td>
                  <td className="px-4 py-4 text-textMuted">Rahul</td>
                  <td className="px-4 py-4 text-white">18%</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">78</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">Pending</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">Review</button>
                  </td>
                </tr>
                <tr className="border-b border-[#222] hover:bg-white/5">
                  <td className="px-4 py-4 text-white font-medium">QT-1025</td>
                  <td className="px-4 py-4 text-textMuted">Beta Ltd</td>
                  <td className="px-4 py-4 text-textMuted">Priya</td>
                  <td className="px-4 py-4 text-white">12%</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">42</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">Pending</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
            <h2 className="text-lg font-medium text-white mb-4">Deal Health Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded bg-red-500/10 border border-red-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white">High Risk</span>
                </div>
                <span className="font-medium text-red-400">3</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-white">Warning</span>
                </div>
                <span className="font-medium text-yellow-400">5</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-green-500/10 border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-white">Healthy</span>
                </div>
                <span className="font-medium text-green-400">18</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-gray-500/10 border border-gray-500/20 mt-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={14} className="text-gray-400" />
                  <span className="text-sm text-white">Stalled</span>
                </div>
                <span className="font-medium text-gray-400">2</span>
              </div>
            </div>
          </div>

          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
            <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-indigo-400">R</span>
                </div>
                <div>
                  <p className="text-sm text-white">Rahul submitted <span className="font-medium text-indigo-400">QT-1024</span></p>
                  <p className="text-xs text-textMuted">10 mins ago</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-green-400">Y</span>
                </div>
                <div>
                  <p className="text-sm text-white">You approved <span className="font-medium text-indigo-400">QT-1018</span></p>
                  <p className="text-xs text-textMuted">1 hour ago</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-400">P</span>
                </div>
                <div>
                  <p className="text-sm text-white">Priya requested revision for <span className="font-medium text-indigo-400">QT-1012</span></p>
                  <p className="text-xs text-textMuted">3 hours ago</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0">
                  <Scale size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Discount rule updated</p>
                  <p className="text-xs text-textMuted">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
