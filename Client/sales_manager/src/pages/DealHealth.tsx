import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

export default function DealHealth() {
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
          <div className="text-3xl font-light text-green-400">18</div>
        </div>
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="text-sm font-medium text-textMuted mb-2">Warning</div>
          <div className="text-3xl font-light text-yellow-400">7</div>
        </div>
        <div className="card p-5 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-sm font-medium text-red-300 mb-2">High Risk</div>
          <div className="text-3xl font-light text-red-400">3</div>
        </div>
        <div className="card p-5 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <div className="text-sm font-medium text-textMuted mb-2">Stalled</div>
          <div className="text-3xl font-light text-gray-400">2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
          <h2 className="text-lg font-medium text-white flex items-center mb-6">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            High Risk Deals
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-[#111] border border-[#333] rounded">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-white">QT-1024 <span className="text-textMuted font-normal text-sm ml-2">Acme</span></div>
                <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Risk: 82</div>
              </div>
              <p className="text-sm text-red-300/70 mb-3">Main Reason: Excessive discount</p>
              <div className="flex space-x-2">
                <button className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                <button className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded transition">Nudge Rep</button>
              </div>
            </div>
            
            <div className="p-4 bg-[#111] border border-[#333] rounded">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-white">QT-1031 <span className="text-textMuted font-normal text-sm ml-2">Beta</span></div>
                <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Risk: 74</div>
              </div>
              <p className="text-sm text-red-300/70 mb-3">Main Reason: Low margin</p>
              <div className="flex space-x-2">
                <button className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                <button className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded transition">Nudge Rep</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
            <h2 className="text-lg font-medium text-white flex items-center mb-6">
              <Clock className="text-gray-400 mr-2" size={20} />
              Stalled Deals
            </h2>
            <div className="p-4 bg-[#111] border border-[#333] rounded">
              <div className="font-medium text-white mb-1">QT-1040</div>
              <div className="text-sm text-textMuted mb-3">Customer: XYZ</div>
              <div className="flex items-center text-sm text-yellow-400/80 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2"></span>
                Inactive for: 8 days
              </div>
              <div className="text-xs text-textMuted mb-4">Last activity: 28 Aug</div>
              <div className="flex space-x-2">
                <button className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                <button className="text-xs border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 px-3 py-1.5 rounded transition">Escalate</button>
              </div>
            </div>
          </div>

          <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] p-5">
            <h2 className="text-lg font-medium text-white flex items-center mb-6">
              <TrendingDown className="text-indigo-400 mr-2" size={20} />
              Discount Anomaly
            </h2>
            <div className="p-4 bg-[#111] border border-[#333] rounded">
              <div className="font-medium text-white mb-3">QT-1032</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-textMuted">Rep average discount:</span>
                  <span className="text-white">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">Current discount:</span>
                  <span className="text-red-400 font-medium">19%</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400/90 text-xs rounded">
                ⚠ Significantly above historical average
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition">View Quote</button>
                <button className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded transition">Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
