import React from 'react';
import { mockUser } from '../mockData';

const Account: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Account Profile</h1>
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--color-border-subtle)] flex items-center justify-center text-3xl font-bold text-[var(--color-accent-green)]">
            {mockUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{mockUser.name}</h2>
            <p className="text-[var(--color-text-secondary)]">{mockUser.company}</p>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Email Address</label>
            <input 
              type="text" 
              readOnly 
              value={mockUser.email}
              className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-secondary)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Company</label>
            <input 
              type="text" 
              readOnly 
              value={mockUser.company}
              className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-secondary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
