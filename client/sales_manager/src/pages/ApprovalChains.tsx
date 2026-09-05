import { Plus, Users, ShieldAlert } from 'lucide-react';

export default function ApprovalChains() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Approval Chains</h1>
          <p className="text-textMuted">Map discount ranges to required approver roles</p>
        </div>
        <button className="btn bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md font-medium flex items-center">
          <Plus size={16} className="mr-2" /> Create Approval Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rule 1 */}
        <div className="card bg-[#1a1a1a] border border-[#333] rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-medium text-white">Rule 1</h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Active</span>
          </div>
          <div className="mb-6">
            <div className="text-sm text-textMuted mb-1">Discount Range</div>
            <div className="text-2xl font-light text-white">10–15%</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-textMuted mb-2 flex items-center"><Users size={14} className="mr-1" /> Approver</div>
            <div className="p-3 bg-[#111] border border-[#333] rounded text-sm text-white font-medium flex items-center">
              1. Sales Manager
            </div>
          </div>
          <div className="mt-6 flex space-x-2 pt-4 border-t border-[#333]">
            <button className="flex-1 py-1.5 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 rounded">Edit</button>
            <button className="flex-1 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded">Deactivate</button>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="card bg-[#1a1a1a] border border-[#333] rounded-lg p-5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 -mr-8 -mt-8 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h3 className="text-lg font-medium text-white">Rule 2</h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Active</span>
          </div>
          <div className="mb-6 relative z-10">
            <div className="text-sm text-textMuted mb-1">Discount Range</div>
            <div className="text-2xl font-light text-white">15–25%</div>
          </div>
          <div className="flex-1 relative z-10">
            <div className="text-sm text-textMuted mb-2 flex items-center"><Users size={14} className="mr-1" /> Approvers (Sequential)</div>
            <div className="space-y-2">
              <div className="p-3 bg-[#111] border border-[#333] rounded text-sm text-white font-medium flex justify-between items-center">
                <span>1. Sales Manager</span>
              </div>
              <div className="p-3 bg-[#111] border border-[#333] rounded text-sm text-yellow-400 font-medium flex justify-between items-center">
                <span>2. Finance</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-2 pt-4 border-t border-[#333] relative z-10">
            <button className="flex-1 py-1.5 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 rounded">Edit</button>
            <button className="flex-1 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded">Deactivate</button>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="card bg-[#1a1a1a] border border-red-500/30 rounded-lg p-5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 -mr-8 -mt-8 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h3 className="text-lg font-medium text-white flex items-center">Rule 3 <ShieldAlert size={14} className="ml-2 text-red-400" /></h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Active</span>
          </div>
          <div className="mb-6 relative z-10">
            <div className="text-sm text-textMuted mb-1">Discount Range</div>
            <div className="text-2xl font-light text-red-400">25%+</div>
          </div>
          <div className="flex-1 relative z-10">
            <div className="text-sm text-textMuted mb-2 flex items-center"><Users size={14} className="mr-1" /> Approvers (Sequential)</div>
            <div className="space-y-2">
              <div className="p-3 bg-[#111] border border-[#333] rounded text-sm text-white font-medium flex justify-between items-center">
                <span>1. Sales Manager</span>
              </div>
              <div className="p-3 bg-[#111] border border-[#333] rounded text-sm text-yellow-400 font-medium flex justify-between items-center">
                <span>2. Finance</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-2 pt-4 border-t border-red-500/20 relative z-10">
            <button className="flex-1 py-1.5 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 rounded">Edit</button>
            <button className="flex-1 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded">Deactivate</button>
          </div>
        </div>

      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-300">
        <strong>Important:</strong> Sales Managers cannot bypass themselves in the approval chain. Configuration rules ensure that at least Manager-level approval is required for all non-standard discounts.
      </div>
    </div>
  );
}
