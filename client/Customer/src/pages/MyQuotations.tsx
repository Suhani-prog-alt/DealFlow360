import React, { useState } from 'react';
import { useStore } from '../store';
import { Link, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';

const MyQuotations: React.FC = () => {
  const quotations = useStore(s => s.quotations);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('status');
  
  let filterLabel = '';
  let filtered = quotations.filter(q => q.quoteNumber.toLowerCase().includes(search.toLowerCase()));

  if (filterParam === 'active') {
    filtered = filtered.filter(q => q.status !== 'Draft' && q.status !== 'Expired');
    filterLabel = 'Active Quotations';
  } else if (filterParam === 'awaiting_response') {
    filtered = filtered.filter(q => q.status === 'Awaiting Customer');
    filterLabel = 'Awaiting Response';
  } else if (filterParam === 'under_negotiation') {
    filtered = filtered.filter(q => q.status === 'Under Negotiation');
    filterLabel = 'Under Negotiation';
  } else if (filterParam === 'accepted') {
    filtered = filtered.filter(q => q.status === 'Accepted');
    filterLabel = 'Accepted Quotations';
  }

  const clearFilter = () => {
    searchParams.delete('status');
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Quotations</h1>
          <input 
            type="text" 
            placeholder="Search quote..." 
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-accent-green)]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        {filterLabel && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-secondary)]">Active Filter:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-border-subtle)] rounded-full text-sm">
              <span className="text-[var(--color-accent-green)] font-medium">{filterLabel}</span>
              <button onClick={clearFilter} className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
            <button onClick={clearFilter} className="text-xs text-[var(--color-text-secondary)] hover:text-white underline ml-2">
              View All Quotations
            </button>
          </div>
        )}
      </div>

      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-sm">
              <th className="p-4 font-medium">Quote #</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Total Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => {
              const total = q.lines.reduce((acc, line) => {
                const sub = line.quantity * line.unitPrice;
                const disc = sub * (line.discount / 100);
                const afterDisc = sub - disc;
                return acc + afterDisc + (afterDisc * (line.tax / 100));
              }, 0);
              return (
                <tr key={q.id} className="border-b border-[var(--color-border-subtle)] last:border-0 hover:bg-[var(--color-border-subtle)] transition-colors">
                  <td className="p-4">{q.quoteNumber}</td>
                  <td className="p-4">{q.date}</td>
                  <td className="p-4">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-[var(--color-border-subtle)] text-[var(--color-text-primary)]">
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to={`/quotations/${q.id}`} className="text-[var(--color-accent-green)] hover:underline text-sm font-medium">View Details</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyQuotations;
