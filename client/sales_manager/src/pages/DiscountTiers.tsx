import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function DiscountTiers() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Discount Tiers & Governance</h1>
          <p className="text-textMuted">Set maximum discount ceilings for tiers and categories</p>
        </div>
        <button 
          className="btn bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md font-medium flex items-center"
          onClick={() => setShowAdd(true)}
        >
          <Plus size={16} className="mr-2" /> Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
          <div className="p-4 border-b border-[#333]">
            <h2 className="text-lg font-medium text-white">Customer Tier Limits</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
                <th className="px-4 py-3 font-medium">Customer Tier</th>
                <th className="px-4 py-3 font-medium text-right">Max Discount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-white">Silver</td>
                <td className="px-4 py-4 text-white font-medium text-right">10%</td>
              </tr>
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-yellow-400 font-medium">Gold</td>
                <td className="px-4 py-4 text-white font-medium text-right">15%</td>
              </tr>
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-cyan-400 font-medium">Platinum</td>
                <td className="px-4 py-4 text-white font-medium text-right">20%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
          <div className="p-4 border-b border-[#333]">
            <h2 className="text-lg font-medium text-white">Category-Specific Overrides</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted bg-[#111]">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Applies To</th>
                <th className="px-4 py-3 font-medium text-right">Limit</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-white">Hardware</td>
                <td className="px-4 py-4 text-textMuted">Gold Tier</td>
                <td className="px-4 py-4 text-white font-medium text-right">15%</td>
              </tr>
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-white">Services</td>
                <td className="px-4 py-4 text-textMuted">Gold Tier</td>
                <td className="px-4 py-4 text-white font-medium text-right">10%</td>
              </tr>
              <tr className="border-b border-[#222]">
                <td className="px-4 py-4 text-white">Subscriptions</td>
                <td className="px-4 py-4 text-textMuted">Gold Tier</td>
                <td className="px-4 py-4 text-white font-medium text-right">12%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Add Discount Rule</h2>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-textMuted mb-2">Customer Tier</label>
                <select className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none">
                  <option>Gold</option>
                  <option>Silver</option>
                  <option>Platinum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-2">Category</label>
                <select className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none">
                  <option>Services</option>
                  <option>Hardware</option>
                  <option>Subscriptions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-2">Maximum Discount (%)</label>
                <input type="number" defaultValue="10" className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none" />
              </div>
            </div>
            <div className="p-6 border-t border-[#333] flex justify-end space-x-3">
              <button className="btn border border-[#333] text-white px-4 py-2 rounded text-sm hover:bg-[#222]" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn bg-indigo-500 text-white px-4 py-2 rounded text-sm hover:bg-indigo-600" onClick={() => setShowAdd(false)}>Save Rule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
