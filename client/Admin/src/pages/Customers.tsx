import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useStore } from '../mock/store';

const PAGE_SIZE = 15;

export default function Customers() {
  const { customers } = useStore();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = customers.filter((c: any) => {
    const matchSearch = !search || [c.name, c.contactPerson, c.email, c.industry].some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchTier = tierFilter === 'All' || c.tier === tierFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchTier && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;

  return (
    <div className="max-w-6xl space-y-6 font-sans">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Customer Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage B2B accounts, tiers, and purchase history</p>
        </div>
        <div className="flex gap-3">
          {[['All', customers.length], ['Gold', customers.filter((c: any) => c.tier === 'Gold').length], ['Silver', customers.filter((c: any) => c.tier === 'Silver').length], ['Bronze', customers.filter((c: any) => c.tier === 'Bronze').length]].map(([tier, count]) => (
            <div key={tier as string} className="bg-[#151816] border border-[#212623] rounded-lg px-4 py-2 text-center">
              <p className="text-lg font-semibold text-[#7d9b6b]">{count}</p>
              <p className="text-xs text-gray-500">{tier}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, contact, email, industry..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#151816] border border-[#212623] text-sm text-gray-200 pl-8 pr-3 py-2 rounded-md focus:border-[#7d9b6b] outline-none placeholder-gray-600"
          />
        </div>
        <select value={tierFilter} onChange={e => { setTierFilter(e.target.value); setPage(1); }} className="bg-[#151816] border border-[#212623] text-sm text-gray-200 px-3 py-2 rounded-md outline-none focus:border-[#7d9b6b]">
          <option>All</option><option>Gold</option><option>Silver</option><option>Bronze</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="bg-[#151816] border border-[#212623] text-sm text-gray-200 px-3 py-2 rounded-md outline-none focus:border-[#7d9b6b]">
          <option>All</option><option>Active</option><option>Inactive</option><option>On Hold</option>
        </select>
        <span className="text-xs text-gray-500 shrink-0">{filtered.length} accounts</span>
      </div>

      {/* Table */}
      <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#212623] bg-[#1a1e1b]">
                {['ID', 'Company', 'Contact', 'Industry', 'Tier', 'Orders', 'Revenue', 'Status', 'Since'].map(h => (
                  <th key={h} className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#212623]">
              {paginatedData.map((c: any) => (
                <tr key={c.id} className="hover:bg-[#1a1e1b]/50 transition-colors">
                  <td className="p-4 text-xs text-gray-600 font-mono">{c.id}</td>
                  <td className="p-4">
                    <p className="text-sm text-gray-200">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-300">{c.contactPerson}</td>
                  <td className="p-4 text-xs text-gray-400">{c.industry}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${c.tier === 'Gold' ? 'bg-[#e69865]/20 text-[#e69865]' : c.tier === 'Silver' ? 'bg-gray-700 text-gray-300' : 'bg-[#c2875a]/20 text-[#c2875a]'}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{c.totalOrders}</td>
                  <td className="p-4 text-sm text-[#7d9b6b] font-medium">{fmt(c.totalRevenue)}</td>
                  <td className="p-4">
                    <span className={`text-xs ${c.status === 'Active' ? 'text-green-400' : c.status === 'On Hold' ? 'text-[#e69865]' : 'text-gray-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">{c.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Page {safePage} of {totalPages} — {((safePage - 1) * PAGE_SIZE) + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1} className="w-8 h-8 flex items-center justify-center rounded border border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b] disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p = i + 1;
              if (totalPages > 5) {
                if (safePage <= 3) p = i + 1;
                else if (safePage >= totalPages - 2) p = totalPages - 4 + i;
                else p = safePage - 2 + i;
              }
              return (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 flex items-center justify-center rounded border text-sm ${safePage === p ? 'bg-[#7d9b6b] text-[#0f1110] border-[#7d9b6b] font-medium' : 'border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b]'}`}>{p}</button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b] disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
