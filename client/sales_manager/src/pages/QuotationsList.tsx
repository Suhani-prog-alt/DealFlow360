import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function QuotationsList() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

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
                <th className="px-4 py-3 font-medium">Quote</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Sales Rep</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Risk</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr 
                className="border-b border-[#222] hover:bg-white/5 cursor-pointer"
                onClick={() => setSelectedQuote('QT-1024')}
              >
                <td className="px-4 py-4 text-indigo-400 font-medium">QT-1024</td>
                <td className="px-4 py-4 text-white">Acme</td>
                <td className="px-4 py-4 text-textMuted">Rahul</td>
                <td className="px-4 py-4 text-white">₹82K</td>
                <td className="px-4 py-4 text-white">18%</td>
                <td className="px-4 py-4"><span className="text-red-400 font-medium">High</span></td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">Pending</span></td>
              </tr>
              <tr 
                className="border-b border-[#222] hover:bg-white/5 cursor-pointer"
                onClick={() => setSelectedQuote('QT-1025')}
              >
                <td className="px-4 py-4 text-indigo-400 font-medium">QT-1025</td>
                <td className="px-4 py-4 text-white">Beta</td>
                <td className="px-4 py-4 text-textMuted">Priya</td>
                <td className="px-4 py-4 text-white">₹1.2L</td>
                <td className="px-4 py-4 text-white">12%</td>
                <td className="px-4 py-4"><span className="text-yellow-400 font-medium">Medium</span></td>
                <td className="px-4 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">Approved</span></td>
              </tr>
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
                <h2 className="text-xl font-bold text-white mb-1">Quotation: {selectedQuote}</h2>
                <p className="text-sm text-textMuted">Created: 05 Sep 2026 • Sales Rep: Rahul</p>
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
                  <div className="font-medium text-white">Acme Corp</div>
                </div>
                <div className="card p-4 bg-[#111] border border-[#333] rounded">
                  <div className="text-xs text-textMuted mb-2">Financials</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-textMuted">Subtotal:</span> <span className="text-white">₹1,00,000</span></div>
                    <div className="flex justify-between"><span className="text-textMuted">Discount:</span> <span className="text-red-400">18%</span></div>
                    <div className="flex justify-between"><span className="text-textMuted">Margin:</span> <span className="text-white">9%</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-[#333] mt-2"><span className="text-white">Final:</span> <span className="text-white">₹82,000</span></div>
                  </div>
                </div>
              </div>

              <div className="card p-4 bg-red-500/10 border border-red-500/20 rounded">
                <h3 className="text-sm font-bold text-red-400 mb-2">Risk Level: HIGH (78/100)</h3>
                <ul className="list-disc pl-5 text-sm text-red-300/80 space-y-1">
                  <li>⚠ Discount exceeds category limit</li>
                  <li>⚠ Low margin</li>
                  <li>⚠ Large discount impact</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-3">Product Lines</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#333] text-xs text-textMuted">
                      <th className="pb-2 font-medium">Product</th>
                      <th className="pb-2 font-medium">Category</th>
                      <th className="pb-2 font-medium">Qty</th>
                      <th className="pb-2 font-medium">Price</th>
                      <th className="pb-2 font-medium">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-[#222]">
                      <td className="py-2 text-white">Enterprise License</td>
                      <td className="py-2 text-textMuted">Software</td>
                      <td className="py-2 text-white">1</td>
                      <td className="py-2 text-white">₹1,00,000</td>
                      <td className="py-2 text-red-400">18%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#333] bg-[#111] flex justify-end space-x-3">
              <button 
                className="btn border border-[#333] text-white hover:bg-[#222] px-4 py-2 rounded font-medium text-sm"
                onClick={() => setSelectedQuote(null)}
              >
                Close
              </button>
              {selectedQuote === 'QT-1024' ? (
                <>
                  <button className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded font-medium text-sm">Reject</button>
                  <button className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded font-medium text-sm">Return for Revision</button>
                  <button className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded font-medium text-sm">Approve</button>
                </>
              ) : (
                <div className="text-sm text-green-400 font-medium py-2">Status: APPROVED</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
