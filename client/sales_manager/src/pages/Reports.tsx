import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-textMuted">Analyze team performance, approval flows, and discount trends</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn border border-[#333] text-white hover:bg-white/5 px-4 py-2 rounded-md font-medium flex items-center text-sm">
            <Download size={14} className="mr-2" /> Export XLS
          </button>
          <button className="btn bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md font-medium flex items-center text-sm">
            <Download size={14} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-4 flex flex-wrap gap-4">
        <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
          <option>Period: This Month</option>
          <option>Period: Last Month</option>
          <option>Period: This Quarter</option>
        </select>
        <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
          <option>Sales Rep: All</option>
          <option>Sales Rep: Rahul</option>
          <option>Sales Rep: Priya</option>
        </select>
        <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
          <option>Approval: All</option>
          <option>Approval: Pending</option>
          <option>Approval: Approved</option>
          <option>Approval: Rejected</option>
        </select>
        <select className="bg-[#111] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
          <option>Category: All</option>
          <option>Category: Hardware</option>
          <option>Category: Software</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center">
          <div className="text-sm font-medium text-textMuted mb-1">Total Quotes</div>
          <div className="text-2xl font-light text-white">48</div>
        </div>
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center">
          <div className="text-sm font-medium text-textMuted mb-1">Approved</div>
          <div className="text-2xl font-light text-green-400">32</div>
        </div>
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center">
          <div className="text-sm font-medium text-textMuted mb-1">Pending</div>
          <div className="text-2xl font-light text-yellow-400">9</div>
        </div>
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center">
          <div className="text-sm font-medium text-textMuted mb-1">Rejected</div>
          <div className="text-2xl font-light text-red-400">7</div>
        </div>
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center bg-indigo-500/5">
          <div className="text-sm font-medium text-indigo-300 mb-1">Avg Discount</div>
          <div className="text-2xl font-light text-indigo-400">13.4%</div>
        </div>
        <div className="card p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-center bg-indigo-500/5">
          <div className="text-sm font-medium text-indigo-300 mb-1">Avg Margin</div>
          <div className="text-2xl font-light text-indigo-400">18.2%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <h2 className="text-lg font-medium text-white flex items-center mb-6">
            <PieChart size={18} className="mr-2 text-indigo-400" /> Approval Performance
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-white">Approved</span><span className="text-textMuted">66%</span></div>
              <div className="w-full bg-[#111] rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '66%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-white">Pending</span><span className="text-textMuted">19%</span></div>
              <div className="w-full bg-[#111] rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '19%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-white">Rejected</span><span className="text-textMuted">15%</span></div>
              <div className="w-full bg-[#111] rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <h2 className="text-lg font-medium text-white flex items-center mb-6">
            <BarChart3 size={18} className="mr-2 text-indigo-400" /> Sales Rep Performance
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-white text-sm">Rahul</span>
              <span className="text-sm bg-[#111] px-2 py-1 rounded border border-[#333] text-textMuted">15 quotes</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-white text-sm">Priya</span>
              <span className="text-sm bg-[#111] px-2 py-1 rounded border border-[#333] text-textMuted">12 quotes</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-white text-sm">Aman</span>
              <span className="text-sm bg-[#111] px-2 py-1 rounded border border-[#333] text-textMuted">9 quotes</span>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <h2 className="text-lg font-medium text-white flex items-center mb-6">
            <TrendingUp size={18} className="mr-2 text-indigo-400" /> Discount Analysis
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#111] p-3 rounded">
              <span className="text-textMuted text-sm">Average discount</span>
              <span className="text-white font-medium">13.4%</span>
            </div>
            <div className="flex justify-between items-center bg-[#111] p-3 rounded">
              <span className="text-textMuted text-sm">Highest discount</span>
              <span className="text-red-400 font-medium">28.0%</span>
            </div>
            <div className="flex justify-between items-center bg-[#111] p-3 rounded">
              <span className="text-textMuted text-sm">Discount violations</span>
              <span className="text-yellow-400 font-medium">14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
