import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl p-6 shadow-sm ${onClick ? 'cursor-pointer hover:border-[var(--color-accent-green)] transition-colors' : ''}`}
    >
      <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default KpiCard;
